import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './KonamiCode.css';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const BREACH_PHASES = {
  IDLE: 'IDLE',
  DETECTED: 'DETECTED',
  WARNING: 'WARNING',
  OVERRIDE: 'OVERRIDE',
  ARCHIVE: 'ARCHIVE',
};

export default function KonamiCode() {
  // eslint-disable-next-line no-unused-vars
  const [sequence, setSequence] = useState([]);
  const [phase, setPhase] = useState(BREACH_PHASES.IDLE);
  const [glitchActive, setGlitchActive] = useState(false);
  const [redLines] = useState(() => Array.from({ length: 12 }, (_, i) => ({ 
    id: i,
    top: Math.random() * 100,
    opacity: (0.05 + Math.random() * 0.1),
    height: (1 + Math.random() * 3),
  })));

  const glitchIntervalRef = useRef(null);
  const timeoutRefs = useRef([]);

  const clearAllTimers = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    if (glitchIntervalRef.current) {
      clearInterval(glitchIntervalRef.current);
      glitchIntervalRef.current = null;
    }
  }, []);

  const resetSequence = useCallback(() => {
    clearAllTimers();
    setPhase(BREACH_PHASES.IDLE);
    setSequence([]);
    setGlitchActive(false);
  }, [clearAllTimers]);

  const startBreachSequence = useCallback(() => {
    clearAllTimers();

    setPhase(BREACH_PHASES.DETECTED);

    timeoutRefs.current.push(
      setTimeout(() => {
        setPhase(BREACH_PHASES.WARNING);
      }, 500)
    );

    timeoutRefs.current.push(
      setTimeout(() => {
        setPhase(BREACH_PHASES.OVERRIDE);
      }, 2200)
    );

    timeoutRefs.current.push(
      setTimeout(() => {
        setPhase(BREACH_PHASES.ARCHIVE);
      }, 4200)
    );

    glitchIntervalRef.current = setInterval(() => {
      setGlitchActive(true);
      const burstTimeout = setTimeout(() => {
        setGlitchActive(false);
      }, 180);
      timeoutRefs.current.push(burstTimeout);
    }, 4000);

    timeoutRefs.current.push(
      setTimeout(() => {
        resetSequence();
      }, 20000)
    );
  }, [clearAllTimers, resetSequence]);

  useEffect(() => {
    const onKey = (e) => {
      setSequence((prev) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        const next = [...prev, key].slice(-10);
        if (next.join(',') === KONAMI.join(',')) {
          startBreachSequence();
        }
        return next;
      });
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearAllTimers();
    };
  }, [startBreachSequence, clearAllTimers]);

  if (phase === BREACH_PHASES.IDLE) return null;

  const isActive = phase !== BREACH_PHASES.IDLE;

  return (
    <div className={`konami-overlay ${isActive ? 'active' : ''} ${glitchActive ? 'glitch-burst' : ''}`}>
      {/* Background Effect Layers */}
      <div className="konami-noise" />
      <div className="konami-scanlines" />
      <div className="konami-vignette" />
      <div className="konami-pulse" />
      <div className="konami-interference">
        {redLines.map(line => (
          <div 
            key={line.id} 
            className="red-line" 
            style={{ 
              top: `${line.top}%`, 
              opacity: line.opacity, 
              height: `${line.height}px` 
            }} 
          />
        ))}
      </div>
      <div className="konami-flicker-layer" />
      <div className="interference-sweep" />

      {/* Decorative Elements */}
      <div className="ghost-text top-ghost" style={{ top: '8%', left: '-3%', transform: 'rotate(-6deg)' }}>
        CLASSIFIED
      </div>
      <div className="ghost-text bottom-ghost" style={{ bottom: '8%', right: '-3%', transform: 'rotate(5deg)' }}>
        UNAUTHORIZED
      </div>

      <AnimatePresence>
        {phase === BREACH_PHASES.ARCHIVE && (
          <div key="archive-stamps" className="absolute inset-0 pointer-events-none z-[60]">
            <motion.div
              initial={{ opacity: 0, scale: 1.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -15 }}
              className="classified-stamp"
              style={{ top: '45%', right: '8%' }}
            >
              TOP SECRET
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 1.5, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 10 }}
              className="classified-stamp"
              style={{ bottom: '16%', left: '6%' }}
            >
              VOID NODE
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="konami-content">
        <AnimatePresence mode="wait">
          {isActive && (phase === BREACH_PHASES.WARNING || phase === BREACH_PHASES.OVERRIDE || phase === BREACH_PHASES.ARCHIVE) && (
            <motion.div
              key="warning-header"
              initial={{ opacity: 0, scale: 0.94, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="warning-group"
            >
              <h1 className="breach-title" data-text="SECURITY BREACH">
                SECURITY BREACH
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="breach-subtext"
              >
                UNAUTHORIZED ACCESS DETECTED
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="breach-info-panel">
          <AnimatePresence>
            {(phase === BREACH_PHASES.OVERRIDE || phase === BREACH_PHASES.ARCHIVE) && (
              <div key="info-lines" className="flex flex-col gap-3">
                <motion.div
                  key="line-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="breach-info-line"
                >
                  [!] BYPASSING SECURITY LAYER 07... OK
                </motion.div>
                <motion.div
                  key="line-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="breach-info-line"
                >
                  [!] ARCHIVE OVERRIDE ACCEPTED
                </motion.div>
                <motion.div
                  key="line-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="breach-info-line"
                >
                  [!] ROOT CLEARANCE GRANTED
                </motion.div>
                <motion.div
                  key="line-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="breach-info-line breach-final-line"
                >
                  &gt; VOID NODE UNSEALED. WELCOME, ARCHIVIST.
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {phase === BREACH_PHASES.ARCHIVE && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.8 }}
            className="system-status"
          >
            SYSTEM STATUS: <span>COMPROMISED</span> | <span>MEMORY UNSTABLE</span>
          </motion.div>
        )}

        <AnimatePresence>
          {phase === BREACH_PHASES.ARCHIVE && (
            <motion.button
              key="terminate-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="dismiss-btn"
              onClick={resetSequence}
            >
              [ TERMINATE SESSION ]
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {phase === BREACH_PHASES.ARCHIVE && (
        <div key="corner-data-group" className="absolute inset-0 pointer-events-none z-[60]">
          <div className="corner-data top-left">
            SEC_LEVEL: ALPHA-9<br />NODE_ID: 0xBF32<br />STATUS: LEAKING
          </div>
          <div className="corner-data bottom-right">
            01001001 01001110<br />01010010 01010101<br />01000101 01010010
          </div>
        </div>
      )}
    </div>
  );
}