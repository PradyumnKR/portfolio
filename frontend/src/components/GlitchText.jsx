import { useState, useEffect } from 'react';

const GlitchText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [corruptIndex, setCorruptIndex] = useState(-1);
  const [corruptCharIdx, setCorruptCharIdx] = useState(0);
  const corruptChars = ['▓', '░', '▒', '█', '§', '¶'];

  useEffect(() => {
    let timeout;
    if (displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 30 + delay);
    } else {
      // Use setTimeout to avoid synchronous setState in effect
      const completeTimeout = setTimeout(() => setIsComplete(true), 10);
      return () => clearTimeout(completeTimeout);
    }
    return () => clearTimeout(timeout);
  }, [displayText, text, delay]);

  useEffect(() => {
    if (!isComplete) return;
    
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * text.length);
      const charIdx = Math.floor(Math.random() * corruptChars.length);
      setCorruptIndex(idx);
      setCorruptCharIdx(charIdx);
      setTimeout(() => setCorruptIndex(-1), 150);
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isComplete, text.length, corruptChars.length]);

  return (
    <span className="relative inline-block">
      {displayText.split('').map((char, i) => (
        <span key={i} className="relative">
          {i === corruptIndex ? corruptChars[corruptCharIdx] : char}
        </span>
      ))}
    </span>
  );
};

export default GlitchText;
