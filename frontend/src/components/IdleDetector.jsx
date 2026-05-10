import { useEffect, useState, useRef } from 'react';

export default function IdleDetector() {
  const [isIdle, setIsIdle] = useState(false);
  const [typedText, setTypedText] = useState('');
  const timeoutRef = useRef(null);
  const message = "OPERATOR HAS GONE SILENT. AWAITING SIGNAL...";
  const typingSpeed = 60;

  const resetTimer = () => {
    setIsIdle(false);
    setTypedText('');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsIdle(true), 90000); // 90 seconds
  };

  useEffect(() => {
    const events = ['mousemove', 'keypress', 'mousedown', 'touchstart', 'scroll'];
    const handleActivity = () => resetTimer();

    events.forEach(event => window.addEventListener(event, handleActivity));
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isIdle) {
      let i = 0;
      setTypedText('');
      const interval = setInterval(() => {
        setTypedText(message.slice(0, i + 1));
        i++;
        if (i >= message.length) clearInterval(interval);
      }, typingSpeed);
      return () => clearInterval(interval);
    }
  }, [isIdle]);

  if (!isIdle) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-[#0e0c09]/90 backdrop-blur-md flex flex-col items-center justify-center cursor-none text-gold font-mono"
      onClick={resetTimer}
    >
      <div className="space-y-8 text-center px-6">
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.4em] text-gold/50 uppercase font-bold">
            SIGNAL LOST // NODE_07
          </p>
          <h2 className="text-xl md:text-2xl tracking-tighter min-h-[1.5em] flex items-center justify-center">
            {typedText}
            <span className="animate-pulse ml-2 inline-block w-2.5 h-6 bg-gold align-middle" />
          </h2>
        </div>
        
        <div className="pt-12 border-t border-gold/10">
          <p className="text-[9px] tracking-[0.6em] text-gold/30 uppercase">
            MOVE CURSOR TO RESTORE CONNECTION
          </p>
        </div>
      </div>

      {/* Subtle terminal noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_200_200%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noise%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.65%27_numOctaves=%273%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23noise)%27/%3E%3C/svg%3E')]"></div>
    </div>
  );
}
