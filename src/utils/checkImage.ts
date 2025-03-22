/**
 * Utility to check if an image exists at the given path
 */
export function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => {
      console.error(`Image not found at: ${url}`);
      resolve(false);
    };
    img.src = url;
  });
}
