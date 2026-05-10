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
    <div className="flex items-center gap-2 font-mono text-[11px] text-gold/50">
      <span className="tracking-widest">SYS.TIME //</span>
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
        original
          .split('')
          .map((char, index) => {
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
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
      className="text-2xl font-bold tracking-tighter text-gold italic flex items-center gap-3 group"
    >
      <motion.span 
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="text-gold/80 text-xl font-normal not-italic"
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
    { name: 'Origins', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Arsenal', path: '/skills' },
    { name: 'Journal', path: '/journal' },
    { name: 'Projects', path: '/projects' },
    { name: 'Dossier', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 lg:px-20 bg-[rgba(14,12,9,0.85)] backdrop-blur-md border-b border-gold/10 shadow-2xl overflow-visible">
      <div className="archive-watermark absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-6xl font-black uppercase tracking-[0.3em] text-gold pointer-events-none">
        DOSSIER
      </div>
      <div className="scan-beam absolute inset-y-0 left-0 z-0 w-1/4 pointer-events-none opacity-10" />
      <div className="pointer-events-none absolute left-6 top-2 hidden text-[8px] uppercase tracking-[0.35em] text-gold/25 lg:block">
        NODE ACCESS // VERIFIED
      </div>
      <div className="pointer-events-none absolute bottom-2 right-8 hidden text-[8px] uppercase tracking-[0.35em] text-gold/25 lg:block">
        ARCHIVE DEPTH // LVL-04
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between relative z-10 h-10">
        <div className="flex items-center gap-6">
          <StatusIndicator 
            state="online" 
            label="STATUS: NOMINAL" 
            labelFirst={true} 
            className="hidden sm:inline-flex text-gold/60"
          />
          <GlitchLogo />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center gap-2 group relative py-1 ${
                  isActive ? 'text-gold' : 'text-ink-dim hover:text-gold'
                }`}
              >
                {/* Status Indicator Dot */}
                <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-gold nav-active-dot' : 'bg-gold/30 group-hover:bg-gold group-hover:nav-dot-pulse'
                }`} />
                
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <SystemClock />
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gold p-2"
          >
            <span className="material-symbols-outlined">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 z-50 w-full bg-espresso/98 border-b border-gold/20 xl:hidden overflow-hidden shadow-2xl"
            style={{ animation: 'scanline-wipe 0.4s ease-out forwards' }}
          >
            <div className="archive-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black uppercase tracking-[0.22em] text-gold pointer-events-none select-none">
              ARCHIVE
            </div>
            <div className="scan-beam absolute inset-y-0 left-0 w-1/3 pointer-events-none opacity-10" />
            <div className="absolute left-6 top-5 text-[8px] uppercase tracking-[0.35em] text-gold/30">
              NODE ACCESS // VERIFIED
            </div>
            <div className="absolute bottom-5 right-6 text-[8px] uppercase tracking-[0.35em] text-gold/30">
              ARCHIVE DEPTH // LVL-04
            </div>
            <nav className="relative z-10 flex flex-col p-8 pt-12 gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-[12px] font-bold tracking-[0.4em] uppercase flex items-center gap-4 ${
                      isActive ? 'text-gold' : 'text-ink-dim'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gold nav-active-dot' : 'bg-gold/30'}`} />
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-6 border-t border-gold/10">
                <SystemClock />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
