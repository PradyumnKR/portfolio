import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VinylRecord = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]">
    {/* Outer record */}
    <circle cx="50" cy="50" r="48" fill="#120d09" stroke="#c5a059" strokeOpacity="0.8" strokeWidth="3" />
    {/* Grooves */}
    <circle cx="50" cy="50" r="38" fill="none" stroke="#2a2218" strokeWidth="2" />
    <circle cx="50" cy="50" r="28" fill="none" stroke="#2a2218" strokeWidth="2" />
    {/* Highlight curves to make rotation highly visible */}
    <path d="M 15 50 A 35 35 0 0 1 35 20" fill="none" stroke="rgba(197, 160, 89, 0.9)" strokeWidth="3" strokeLinecap="round" />
    <path d="M 85 50 A 35 35 0 0 1 65 80" fill="none" stroke="rgba(197, 160, 89, 0.5)" strokeWidth="3" strokeLinecap="round" />
    {/* Label */}
    <circle cx="50" cy="50" r="16" fill="#c5a059" />
    <circle cx="50" cy="50" r="12" fill="#8b2621" />
    {/* Center hole */}
    <circle cx="50" cy="50" r="4" fill="#0a0806" />
  </svg>
);

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);
  const playAttemptedRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Low volume for ambient feel
      audioRef.current.loop = true;

      const tryPlay = () => {
        // Only try to auto-play if the user hasn't explicitly clicked pause
        if (!playAttemptedRef.current && audioRef.current) {
          audioRef.current.play().then(() => {
             playAttemptedRef.current = true;
             document.removeEventListener('click', tryPlay);
             document.removeEventListener('keydown', tryPlay);
          }).catch(() => {
             // Still blocked by browser
          });
        }
      };

      // Browsers block autoplay. Try playing immediately, and if it fails,
      // wait for the user's very first interaction (click or keypress) to start the music.
      audioRef.current.play().then(() => {
        playAttemptedRef.current = true;
      }).catch(() => {
        document.addEventListener('click', tryPlay);
        document.addEventListener('keydown', tryPlay);
      });
      
      return () => {
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('keydown', tryPlay);
      };
    }
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      playAttemptedRef.current = true; // Mark as attempted so global listeners don't override the user's pause
    } else {
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed. Make sure 'Resident Evil Remake Soundtrack _Save Heaven_.mp3' is in the public folder:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="fixed bottom-5 left-5 z-[100] flex items-center gap-3 opacity-55 transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100 md:bottom-8 md:left-8 md:gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef} 
        src="/Resident Evil Remake Soundtrack _Save Heaven_.mp3" 
      />
      
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative size-10 md:size-12 flex items-center justify-center rounded-full bg-espresso border border-gold/35 text-gold shadow-[0_0_16px_rgba(0,0,0,0.75)] group overflow-hidden"
      >
        <motion.div 
          className="relative z-10 flex items-center justify-center"
          animate={{ 
            rotate: isPlaying ? 360 : 0,
          }}
          transition={{
            duration: isPlaying ? 3 : 0.5,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear"
          }}
        >
          {isPlaying ? (
            <VinylRecord />
          ) : (
            <span className="material-symbols-outlined text-2xl">volume_off</span>
          )}
        </motion.div>

        {/* Outer Ring Pulse */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-gold/30 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Aesthetic Label/Hint */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col text-left pointer-events-none bg-espresso/95 backdrop-blur-md border border-gold/20 px-4 py-2 rounded-lg shadow-2xl"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">
              Ambient Audio
            </span>
            <span className="text-[10px] text-parchment italic font-serif mt-1">
              {isPlaying ? 'Now Playing: Resident Evil Remake Soundtrack _Save Heaven_.mp3' : 'Summon the music'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
