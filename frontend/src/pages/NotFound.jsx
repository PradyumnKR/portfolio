import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import './NotFound.css';

const METADATA = [
  "RECOVERY_FAILED // NODE_0x114",
  "SIGNAL_LOST // TRACE_TERMINATED",
  "MEMORY_DUMP_INCOMPLETE",
  "ARCHIVE_SEALED // LEVEL_OMEGA",
  "DIRECTORY_CORRUPTED",
];

const BOOT_LOGS = [
  "[OK] INITIALIZING SECURE_UPLINK",
  "[ERR] SECTOR_7G_READ_FAILURE",
  "[WRN] BUFFER_OVERFLOW_DETECTED",
  "[ERR] DATA_INTEGRITY_COMPROMISED",
  "[OK] ATTEMPTING_FILE_RECONSTRUCTION...",
];

export default function NotFound() {
  const [bootPhase, setBootPhase] = useState(0); 
  const [glitchActive, setGlitchActive] = useState(false);
  const [logs, setLogs] = useState([]);
  const [redLines, setRedLines] = useState([]); 
  
  const [traceId] = useState(() => 
    `ID_${Math.floor(Math.random() * 9999)}_REF_${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  );

  const requestRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const lines = Array.from({ length: 12 }, (_, i) => ({ 
      id: i,
      top: Math.random() * 100,
      opacity: (0.05 + Math.random() * 0.1),
      height: (1 + Math.random() * 3),
    })).filter(line => 
      line && 
      typeof line.top === 'number' && 
      typeof line.opacity === 'number' && 
      typeof line.height === 'number'
    );
    setRedLines(lines);
  }, []);

  useEffect(() => {
    const updateParallax = () => {
      document.documentElement.style.setProperty('--404-px', `${mouseRef.current.x}px`);
      document.documentElement.style.setProperty('--404-py', `${mouseRef.current.y}px`);
      requestRef.current = requestAnimationFrame(updateParallax);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 15;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 15;
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const fallback = setTimeout(() => {
      setBootPhase(1);
    }, 4000); 
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    let logIdx = 0;
    let logInterval;
    
    const startDelay = setTimeout(() => {
      logInterval = setInterval(() => {
        if (logIdx < BOOT_LOGS.length) {
          setLogs(prev => [...prev, BOOT_LOGS[logIdx]]);
          logIdx++;
        } else {
          clearInterval(logInterval);
          setTimeout(() => setBootPhase(1), 800);
        }
      }, 150); 
    }, 500); 

    return () => {
      clearTimeout(startDelay);
      if (logInterval) clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    let glitchTimeout;
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
      
      const nextDelay = 5000 + Math.random() * 5000; 
      glitchTimeout = setTimeout(triggerGlitch, nextDelay);
    };

    glitchTimeout = setTimeout(triggerGlitch, 2000);
    return () => clearTimeout(glitchTimeout);
  }, []);

  return (
    <div className={`terminal-404-root ${glitchActive ? 'is-glitching' : ''}`}>
      <div className="parallax-layer grid-bg" />
      <div className="parallax-layer watermark-bg">
        <GlitchText text="404" delay={1000} />
      </div>
      
      <div className="edge-meta top-left"><GlitchText text={METADATA[0]} delay={200} /></div>
      <div className="edge-meta top-right"><GlitchText text={METADATA[1]} delay={400} /></div>
      <div className="edge-meta bottom-left"><GlitchText text={METADATA[2]} delay={600} /></div>
      <div className="edge-meta bottom-right"><GlitchText text={METADATA[3]} delay={800} /></div>

      <div className="crt-scanlines" />
      <div className="crt-vignette" />
      <div className="crt-interference">
        {(redLines || []).filter(Boolean).map(line => (
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
      <div className="crt-flicker-layer" />
      <div className="noise-grain" />

      <main className="terminal-main">
        {bootPhase === 0 ? (
          <div className="boot-sequence">
            {(logs || []).filter(Boolean).map((log, i) => (
              <div key={i} className="log-line" 
                   style={{ color: (log && typeof log === 'string' && log.includes('ERR')) ? '#f87171' : 'rgba(200, 169, 110, 0.6)' }}>
                <GlitchText text={log} />
              </div>
            ))}
            <div className="boot-cursor" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="content-gate"
          >
            <header className="terminal-header">
              <span className="breadcrumb">
                <GlitchText text="ARCHIVE // NODE_LOST" delay={100} />
              </span>
              <div className={`status-tag ${glitchActive ? 'breach' : ''}`}>
                <GlitchText text={glitchActive ? 'BREACH_DETECTED' : 'SECTOR_OFFLINE'} />
              </div>
            </header>

            <div className="title-area">
              <h1 className="main-title" data-text="404: SIGNAL_LOST">
                <GlitchText text="404: SIGNAL_LOST" delay={200} />
              </h1>
            </div>

            <div className="terminal-divider" />

            <div className="message-box">
              <p className="primary-msg">
                <GlitchText text="THE REQUESTED ARTIFACT IS MISSING OR HAS BEEN REDACTED FROM THE CENTRAL REPOSITORY." delay={80} />
              </p>
              <p className="secondary-msg italic">
                <GlitchText text='"The archive does not forget. It simply misfiles."' delay={100} />
              </p>
            </div>

            <div className="terminal-actions">
              <Link to="/" className="secure-btn">
                <GlitchText text="← SECURE EXTRACTION" delay={200} />
              </Link>
              <div className="trace-id">
                <GlitchText text={traceId} delay={400} />
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}