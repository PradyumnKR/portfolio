import { useState, useEffect, useRef } from 'react';

const COMMANDS = {
  help: `AVAILABLE COMMANDS:
  help          — display this message
  whoami        — identify the operator
  ls projects   — list archived projects
  cat resume.txt — display personnel file
  clear         — clear terminal output
  exit          — close terminal`,

  whoami: `OPERATOR: PRADYUMN KUMAR SHUKLA
CLEARANCE: LEVEL 9.7
ROLE: AI & Full-Stack Engineer
BASE: Jaipur, Rajasthan // India
STATUS: ACTIVE — SEEKING DEPLOYMENT
AFFILIATION: NOCTURNE STUDIES`,

  'ls projects': `ARCHIVE INDEX // 6 ARTIFACTS CATALOGUED

  [ARCH-001] SCRIBE'S CIPHER ............. DEPLOYED
  [ARCH-002] FILE SORTER ................. COMPLETED  
  [ARCH-003] FRAUD DETECTION ENGINE ...... DEPLOYED
  [ARCH-004] THIS PORTFOLIO .............. LIVE
  [ARCH-005] SENTINEL OPS ................ DEPLOYED
  [ARCH-006] LEDGERLY .................... COMPLETED

  ACCESS: navigate to /projects for full dossiers`,

  'cat resume.txt': `PERSONNEL FILE // PRADYUMN KUMAR SHUKLA
  ──────────────────────────────────────────
  EDUCATION:
    B.Tech AI & Data Science — JECRC (2022-2026)
    CGPA: 9.7/10

  EXPERIENCE:
    Associate ServiceNow Developer Intern
    Netsmartz Infotech — JAN 2026 to PRESENT
    
  STACK:
    JavaScript, Python, C++, React.js,
    Tailwind CSS, Node.js, MongoDB, SQL

  CERTIFICATIONS:
    ServiceNow CSA & CAD
    Runner-up — Smart India Hackathon 2023

  CONTACT: pradyumnkrshukla.4672@gmail.com
  ──────────────────────────────────────────
  END OF FILE`,

  clear: '__CLEAR__',
  exit: '__EXIT__',
};

export default function HiddenTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([
    { type: 'system', text: 'NOCTURNE STUDIES // SECURE TERMINAL v1.0' },
    { type: 'system', text: 'TYPE "help" FOR AVAILABLE COMMANDS' },
    { type: 'system', text: '──────────────────────────────────────────' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { hour12: false }));
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [lines, open]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const result = COMMANDS[trimmed];

    const newLines = [
      ...lines,
      { type: 'input', text: `> ${cmd}` },
    ];

    if (trimmed === 'clear') {
      setLines([{ type: 'system', text: 'TERMINAL CLEARED.' }]);
    } else if (trimmed === 'exit') {
      setOpen(false);
      setLines(prev => [...prev, { type: 'input', text: `> ${cmd}` }]);
    } else if (result) {
      setLines([
        ...newLines,
        { type: 'output', text: result },
      ]);
    } else if (trimmed === '') {
      setLines(newLines);
    } else {
      setLines([
        ...newLines,
        { type: 'error', text: `COMMAND NOT RECOGNIZED: "${cmd}" — type "help"` },
      ]);
    }

    setHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex]);
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        background: 'rgba(8,6,4,0.94)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div 
        ref={containerRef}
        style={{
          width: 'min(95vw, 1100px)',
          height: 'auto',
          maxHeight: 'min(85vh, 900px)',
          background: '#0a0805',
          border: '1px solid rgba(200,169,110,0.25)',
          borderTop: '2px solid rgba(200,169,110,0.7)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `
            0 0 0 1px rgba(200,169,110,0.05),
            0 0 40px rgba(200,169,110,0.08),
            0 0 80px rgba(200,169,110,0.04),
            inset 0 0 40px rgba(0,0,0,0.5)
          `,
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* CRT Scanline Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />

        {/* Noise Texture Overlay */}
        <div style={{
          position: 'absolute',
          inset: '-50%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 11,
        }} />

        {/* Title Bar */}
        <div style={{
          padding: '12px 20px',
          borderBottom: '1px solid rgba(200,169,110,0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(200,169,110,0.03)',
          position: 'relative',
          zIndex: 20,
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px', marginRight: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a1a0a' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3a3a0a' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a3a0a' }} />
            </div>
            <span style={{ 
              fontFamily: 'VT323, monospace', 
              fontSize: '16px', 
              color: 'rgba(200,169,110,0.6)', 
              letterSpacing: '0.2em' 
            }}>
              NOCTURNE STUDIES // TERMINAL
            </span>
          </div>
          <span style={{ 
            fontFamily: 'VT323, monospace', 
            fontSize: '14px', 
            color: 'rgba(200,169,110,0.25)', 
            letterSpacing: '0.15em' 
          }}>
            PRESS ESC OR \` TO CLOSE
          </span>
        </div>

        {/* Output Area */}
        <div style={{
          flex: '1 1 auto',
          overflowY: 'auto',
          padding: '24px 24px 12px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(200,169,110,0.15) transparent',
          position: 'relative',
          zIndex: 20,
          minHeight: 0
        }}>
          {lines.map((line, i) => (
            <pre key={i} style={{
              fontFamily: 'VT323, monospace',
              fontSize: line.type === 'system' ? '15px' : '18px',
              lineHeight: '1.5',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: line.type === 'input' ? '#e8d090'
                : line.type === 'error' ? '#f87171'
                : line.type === 'system' ? 'rgba(200,169,110,0.4)'
                : '#c8a96e',
            }}>
              {line.text}
            </pre>
          ))}
          <div ref={bottomRef} style={{ height: '1px' }} />
        </div>

        {/* Input Area */}
        <div style={{
          borderTop: '1px solid rgba(200,169,110,0.12)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          background: 'rgba(0,0,0,0.4)',
          position: 'relative',
          zIndex: 20,
          flexShrink: 0
        }}>
          <span style={{ 
            fontFamily: 'VT323, monospace', 
            fontSize: '18px', 
            color: 'rgba(200,169,110,0.5)', 
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            lineHeight: '1.5',
            marginTop: '1px'
          }}>
            ARCHIVE //
          </span>
          <div style={{ 
            flex: 1, 
            position: 'relative', 
            minHeight: '27px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            {/* Visual Display for typed text and cursor */}
            <div style={{ 
              fontFamily: 'VT323, monospace', 
              fontSize: '18px', 
              color: '#e8d090',
              letterSpacing: '0.05em',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              pointerEvents: 'none',
              width: '100%'
            }}>
              {input}
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '18px',
                background: '#c8a96e',
                animation: 'terminal-blink 0.8s step-end infinite',
                verticalAlign: 'text-bottom',
                marginLeft: '1px',
                opacity: isFocused ? 1 : 0.3,
                boxShadow: isFocused ? '0 0 8px rgba(200, 169, 110, 0.4)' : 'none'
              }} />
            </div>

            {/* Actual Hidden Input */}
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'transparent',
                fontFamily: 'VT323, monospace',
                fontSize: '18px',
                caretColor: 'transparent',
                zIndex: 5,
                resize: 'none',
                overflow: 'hidden'
              }}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div style={{
          padding: '6px 20px',
          borderTop: '1px solid rgba(200,169,110,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          background: 'rgba(200,169,110,0.02)',
          position: 'relative',
          zIndex: 20,
          flexShrink: 0
        }}>
          <span style={{ 
            fontFamily: 'VT323, monospace', 
            fontSize: '13px', 
            color: 'rgba(200,169,110,0.25)', 
            letterSpacing: '0.15em' 
          }}>
            NODE: ACTIVE // ENCRYPTION: ON
          </span>
          <span style={{ 
            fontFamily: 'VT323, monospace', 
            fontSize: '13px', 
            color: 'rgba(200,169,110,0.25)', 
            letterSpacing: '0.15em' 
          }}>
            {time}
          </span>
        </div>
      </div>
      
      <style>{`
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        /* Custom scrollbar for output area */
        .terminal-output::-webkit-scrollbar {
          width: 6px;
        }
        .terminal-output::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-output::-webkit-scrollbar-thumb {
          background: rgba(200, 169, 110, 0.15);
          border-radius: 3px;
        }
        .terminal-output::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 169, 110, 0.25);
        }
      `}</style>
    </div>
  );
}
