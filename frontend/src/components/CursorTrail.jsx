import { useEffect } from 'react';

export default function CursorTrail() {
  useEffect(() => {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 99999;
      overflow: visible;
    `;
    document.body.appendChild(container);

    const COUNT = 8;
    const dots = Array.from({ length: COUNT }, (_, i) => {
      const dot = document.createElement('div');
      const size = Math.max(2, 6 - i);
      dot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: #c8a96e;
        pointer-events: none;
        opacity: 0;
        left: 0; top: 0;
        will-change: transform, opacity;
      `;
      container.appendChild(dot);
      return dot;
    });

    // Separate position tracking — NO shared references
    const positions = Array.from({ length: COUNT }, () => ({ x: -100, y: -100 }));
    let mouse = { x: -100, y: -100 };
    let started = false;
    let raf;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!started) {
        started = true;
        dots.forEach(d => d.style.opacity = '1');
      }
    };

    const animate = () => {
      // Lead dot follows mouse directly
      positions[0].x += (mouse.x - positions[0].x) * 0.6;
      positions[0].y += (mouse.y - positions[0].y) * 0.6;

      // Each subsequent dot follows the one before it
      for (let i = 1; i < COUNT; i++) {
        positions[i].x += (positions[i-1].x - positions[i].x) * 0.4;
        positions[i].y += (positions[i-1].y - positions[i].y) * 0.4;
      }

      dots.forEach((dot, i) => {
        dot.style.transform = `translate(${positions[i].x - dot.offsetWidth/2}px, ${positions[i].y - dot.offsetHeight/2}px)`;
        dot.style.opacity = started ? String((1 - i / COUNT) * 0.6) : '0';
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  return null;
}