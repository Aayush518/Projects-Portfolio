export class ResourcePreloader {
  private static instance: ResourcePreloader;
  private preloadedImages: Set<string> = new Set();
  private preloadedFonts: Set<string> = new Set();
  private lowPriorityQueue: string[] = [];
  private highPriorityQueue: string[] = [];
  private isLowBandwidth: boolean = false;

  private constructor() {
    this.checkConnection();
    this.initializeIntersectionObserver();
  }

  static getInstance(): ResourcePreloader {
    if (!ResourcePreloader.instance) {
      ResourcePreloader.instance = new ResourcePreloader();
    }
    return ResourcePreloader.instance;
  }

  private checkConnection() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.isLowBandwidth = connection.saveData || 
                           connection.effectiveType === '2g' || 
                           connection.effectiveType === '3g';
    }
  }

  private initializeIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.processLowPriorityQueue();
          }
        });
      },
      { rootMargin: '50px' }
    );

    // Observe the document body to trigger low priority loads
    observer.observe(document.body);
  }

  preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve();
    }

    if (this.isLowBandwidth && priority === 'low') {
      this.lowPriorityQueue.push(src);
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  preloadFont(fontFamily: string, weight: string = '400'): Promise<void> {
    const key = `${fontFamily}-${weight}`;
    if (this.preloadedFonts.has(key)) {
      return Promise.resolve();
    }

    return document.fonts.load(`${weight} 1em ${fontFamily}`).then(() => {
      this.preloadedFonts.add(key);
    });
  }

  private async processLowPriorityQueue() {
    if (this.lowPriorityQueue.length === 0) return;

    const batch = this.lowPriorityQueue.splice(0, 3);
    await Promise.all(
      batch.map(src => this.preloadImage(src, 'high'))
    );

    if (this.lowPriorityQueue.length > 0) {
      requestIdleCallback(() => this.processLowPriorityQueue());
    }
  }
} 