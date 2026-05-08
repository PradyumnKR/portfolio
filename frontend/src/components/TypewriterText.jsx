import { motion } from 'framer-motion';

export default function TypewriterText({ text, delay = 0, className = '' }) {
  // Split text into lines, then characters
  const lines = typeof text === 'string' ? text.split('\n') : [text];

  return (
    <div className={`typewriter-text ${className}`}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          {line.split('').map((char, charIndex) => (
            <motion.span
              key={`${lineIndex}-${charIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: delay + (lineIndex * 10 + charIndex) * 0.03, // Staggered reveal
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          {/* Add a blinking cursor at the end of the last line */}
          {lineIndex === lines.length - 1 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[0.6em] h-[1em] bg-current ml-1 align-middle"
              style={{ display: 'inline-block' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
