import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CustomCursor — luxury animated cursor
 * Dot follows mouse exactly; ring follows with spring lag.
 * Expands on hoverable elements.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible,  setIsVisible]  = useState(false);

  // Ring position with lag (requestAnimationFrame lerp)
  const ring  = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const raf   = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    // Detect hover on interactive elements
    const onMouseOver = (e) => {
      if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label, .cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };
    const onMouseOut = () => setIsHovering(false);

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover',  onMouseOver);
    document.addEventListener('mouseout',   onMouseOut);

    // Smooth ring follow via lerp
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover',  onMouseOver);
      document.removeEventListener('mouseout',   onMouseOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          top: 0, left: 0,
          willChange: 'transform',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="cursor-dot"
          style={{
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
            transition: 'transform 0.3s ease',
          }}
        />
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        className="custom-cursor"
        style={{
          top: 0, left: 0,
          willChange: 'transform',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className={`cursor-ring ${isHovering ? 'expanded' : ''}`}
          style={{
            background: isHovering ? 'rgba(255,255,255,0.05)' : 'transparent',
          }}
        />
      </div>
    </>
  );
}
