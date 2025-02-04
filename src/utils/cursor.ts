export const initCustomCursor = () => {
  const cursor = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (!cursor || !cursorOutline) return;

  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    
    cursorOutline.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  });

  // Add hover effect
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('cursor-hover');
    });
  });
}; 