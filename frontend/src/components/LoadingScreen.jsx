import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Cinematic Timing Sequence
    // Phase 0: Absolute darkness to build tension (0.5s)
    // Phase 1: Slow fade-in of the atmospheric warning/intro card
    // Phase 2: Slow fade-out of the text
    // onComplete triggers the component unmount and reveals the main app
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 2100);
    const t3 = setTimeout(onComplete, 2700); 

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0806] pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
      {/* Heavy CRT Grain just for the loading screen */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_256_256%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27noise%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23noise)%27/%3E%3C/svg%3E')] opacity-30 mix-blend-overlay"></div>
      
      {/* Subtle vignette to focus the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0806_100%)] opacity-80"></div>

      <AnimatePresence>
        {phase === 1 && (
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 1 } }}
            className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-6"
          >
            {/* Retro icon emblem */}
            <span className="material-symbols-outlined text-gold/40 text-3xl mb-8 animate-pulse">settings_input_antenna</span>
            
            {/* The Classic Survival Horror / Retro Game Warning Text */}
            <h1 className="text-parchment/80 text-xs md:text-sm font-mono uppercase tracking-[0.4em] leading-[2.5em]">
              This terminal is connected to an active frequency.
              <br/><br/>
              Audio playback and physical inputs are strongly recommended for the optimal experience.
            </h1>
            
            {/* Aesthetic divider */}
            <div className="mt-12 w-px h-16 bg-gradient-to-b from-gold/40 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
