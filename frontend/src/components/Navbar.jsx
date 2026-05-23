import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StatusIndicator from './StatusIndicator';

const SystemClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gold/50 tabular-nums">
      <span className="tracking-widest hidden xl:inline">SYS.TIME //</span>
      <span>{time.toLocaleTimeString('en-GB', { hour12: false })}</span>
    </div>
  );
};

const GlitchLogo = () => {
  const [text, setText] = useState('The Archivist.');
  const [isGlitching, setIsGlitching] = useState(false);
  const original = 'The Archivist.';
  const chars = '!<>-_\\/[]{}-=+*^?#________';

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setText(
        original.split('').map((char, index) => {
          if (index < iterations) return original[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iterations >= original.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <Link
      to="/"
      onMouseEnter={triggerGlitch}
      className="text-xl font-bold tracking-tighter text-gold italic flex items-center gap-2.5 group shrink-0"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="text-gold/80 text-lg font-normal not-italic"
      >
        ◈
      </motion.span>
      <span className="relative inline-block">{text}</span>
    </Link>
  );
};

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Origins',  path: '/'        },
    { name: 'About Me', path: '/about'   },
    { name: 'Arsenal',  path: '/skills'  },
    { name: 'Journal',  path: '/journal' },
    { name: 'Projects', path: '/projects'},
    { name: 'Dossier',  path: '/resume'  },
    { name: 'Contact',  path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(14,12,9,0.90)] backdrop-blur-md border-b border-gold/10 shadow-2xl overflow-visible">

      {/* ── Telemetry micro-strip above the main row ── */}
      <div className="hidden lg:flex items-center justify-between px-6 lg:px-20 py-[3px] border-b border-gold/[0.06]">
        <span className="text-[7.5px] text-gold/25 font-mono uppercase tracking-[0.45em]">
          NODE ACCESS // VERIFIED
        </span>
        <span className="text-[7.5px] text-gold/25 font-mono uppercase tracking-[0.45em]">
          ARCHIVE DEPTH // LVL-04
        </span>
      </div>

      {/* ── Main nav row ── */}
      <div className="relative px-6 lg:px-20 py-3">

        {/* DOSSIER watermark — constrained so it doesn't spill */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[clamp(2rem,6vw,4rem)] font-black uppercase tracking-[0.35em] text-gold/[0.04] whitespace-nowrap">
            DOSSIER
          </span>
        </div>

        {/* Scan beam */}
        <div className="scan-beam absolute inset-y-0 left-0 z-0 w-1/4 pointer-events-none opacity-10" />

        <div className="relative z-10 flex items-center justify-between gap-4">

          {/* Left — status + logo */}
          <div className="flex items-center gap-3 shrink-0">
            <StatusIndicator
              state="online"
              label="STATUS: NOMINAL"
              labelFirst={true}
              className="hidden md:inline-flex text-gold/60 text-[9px]"
            />
            <GlitchLogo />
          </div>

          {/* Centre — desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-1.5 group relative py-1 whitespace-nowrap ${
                    isActive ? 'text-gold' : 'text-ink-dim hover:text-gold'
                  }`}
                >
                  <div className={`w-1 h-1 rounded-full transition-all duration-300 shrink-0 ${
                    isActive
                      ? 'bg-gold nav-active-dot'
                      : 'bg-gold/30 group-hover:bg-gold group-hover:nav-dot-pulse'
                  }`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right — clock + mobile toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <SystemClock />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gold p-1.5 hover:bg-gold/10 transition-colors flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 z-50 w-full bg-espresso/98 border-b border-gold/20 lg:hidden overflow-hidden shadow-2xl"
          >
            <div className="relative p-6 pt-8">
              <div className="archive-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black uppercase tracking-[0.22em] text-gold/[0.04] pointer-events-none select-none">
                ARCHIVE
              </div>
              <div className="scan-beam absolute inset-y-0 left-0 w-1/3 pointer-events-none opacity-5" />

              <nav className="relative z-10 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-[11px] font-bold tracking-[0.4em] uppercase flex items-center gap-4 py-3 border-b border-gold/[0.07] ${
                        isActive ? 'text-gold' : 'text-ink-dim'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive ? 'bg-gold nav-active-dot' : 'bg-gold/30'
                      }`} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile footer strip */}
              <div className="relative z-10 mt-6 pt-4 border-t border-gold/[0.07] flex items-center justify-between">
                <StatusIndicator
                  state="online"
                  label="STATUS: NOMINAL"
                  labelFirst={true}
                  className="text-gold/60 text-[9px]"
                />
                <SystemClock />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}