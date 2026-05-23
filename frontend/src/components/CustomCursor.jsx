import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Physics: The dot is fast and precise
  const dotSpringConfig = { damping: 20, stiffness: 800 };
  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  // Physics: The ring follows much more closely now
  const ringSpringConfig = { damping: 25, stiffness: 450 };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Inner Dot: The precise point of interaction */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[1000001]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 0.5 : (isHovered ? 2.5 : 1),
          backgroundColor: isHovered ? '#fff' : '#c5a059',
        }}
      />
      
      {/* Outer Ring: The aesthetic trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-gold/40 rounded-full pointer-events-none z-[1000000]"
        animate={{
          scale: isMouseDown ? 0.8 : (isHovered ? 1.8 : 1),
          borderWidth: isHovered ? '1px' : '2px',
          borderColor: isHovered ? 'rgba(197, 160, 89, 0.8)' : 'rgba(197, 160, 89, 0.4)',
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Pulsing Aura: Subtle depth on hover */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-gold/5 rounded-full pointer-events-none z-[999999]"
        animate={{
          scale: isHovered ? 2.5 : 0,
          opacity: isHovered ? 0.3 : 0,
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
