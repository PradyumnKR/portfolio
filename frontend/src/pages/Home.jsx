import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import { Link } from 'react-router-dom';
import ChronicleStrip from '../components/ChronicleStrip';
import StatusIndicator from '../components/StatusIndicator';

const useGithubCommits = () => {
  const [totalCommits, setTotalCommits] = useState(null);
  useEffect(() => {
    const fetchCommits = async () => {
      const username = 'PradyumnKR';
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      };
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
          { headers }
        );
        const repos = await reposRes.json();
        const commitCounts = await Promise.all(
          repos.map(async (repo) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=1`,
                { headers }
              );
              
              if (res.status === 409) return 0;
              if (!res.ok) return 0;

              const link = res.headers.get('Link');
              if (link) {
                const match = link.match(/page=(\d+)>; rel="last"/);
                if (match) return parseInt(match[1]);
              }
              const commits = await res.json();
              return Array.isArray(commits) ? commits.length : 0;
            } catch {
              return 0;
            }
          })
        );
        const total = commitCounts.reduce((sum, n) => sum + n, 0);
        setTotalCommits(total);
      } catch (err) {
        console.error('GitHub API error:', err);
        setTotalCommits(2400); // Fallback
      }
    };
    fetchCommits();
  }, []);
  return totalCommits;
};

const StatCounter = ({ target, duration, delay, formatter }) => {
  const [display, setDisplay] = useState('--');
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const chars = '0123456789';
    
    timerRef.current = setTimeout(() => {
      // Scramble phase
      let scrambleCount = 0;
      const scrambleInterval = setInterval(() => {
        setDisplay(
          Array.from({ length: 2 }, 
            () => chars[Math.floor(Math.random() * chars.length)]
          ).join('')
        );
        scrambleCount++;
        if (scrambleCount >= 3) {
          clearInterval(scrambleInterval);
          
          // Counter phase
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(eased * target);
            setDisplay(formatter(value));
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              setDisplay(formatter(target));
            }
          };
          rafRef.current = requestAnimationFrame(tick);
        }
      }, 50);
    }, delay + 800);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); 

  return (
    <div className="text-xl font-bold text-parchment font-mono min-h-[1.5em] flex items-center">
      {display}
    </div>
  );
};

export default function Home() {
  const githubCommits = useGithubCommits();
  const [time, setTime] = useState(new Date());
  const [elapsed, setElapsed] = useState(0);
  const [memAlloc] = useState(() => Math.floor(Math.random() * 200 + 400));
  const [showSubtitle, setShowSubtitle] = useState(false);

  const commitsFormatter = useCallback(
    (n) => n >= 1000 ? (n/1000).toFixed(1) + 'K+' : n.toString(), []
  );
  const artifactsFormatter = useCallback(
    (n) => n.toString(), []
  );
  const sectionsFormatter = useCallback(
    (n) => n.toString().padStart(2, '0'), []
  );

  const tickerItems = [
    'STATUS OPTIMAL',
    'UPLINK ACTIVE',
    'NODE STABLE',
    'DOSSIER VERIFIED',
    'SIGNAL LOCKED',
    'SECTOR-7 ONLINE',
    'TRANSMISSION STABLE',
    'MEMORY CORE SYNCHRONIZED',
  ];
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const elapsedTimer = setInterval(() => setElapsed(prev => prev + 1), 1000);
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1500);
    return () => {
      clearInterval(timer);
      clearInterval(elapsedTimer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  return (
    <div className="home-page bg-[#0e0c09]">
      <section className="relative h-[calc(100vh-145px)] min-h-[540px] w-full flex items-center justify-center px-6 md:px-20 overflow-hidden bg-[#0e0c09]">
        
       

        {/* Subtle Surveyor Grid Drift Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage: `linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)`,
            backgroundSize: '120px 120px',
            animation: 'grid-drift 16s linear infinite'
          }}
        />
        <div className="archive-fog absolute -inset-16 z-0 pointer-events-none opacity-60" />
        <div className="absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="scan-beam absolute inset-y-0 left-0 z-[1] w-1/3 pointer-events-none opacity-20" />
        <div className="archive-watermark absolute left-1/2 top-[45%] z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black uppercase tracking-[0.12em] text-gold pointer-events-none select-none">
          ARCHIVE NODE 01
        </div>
        <div className="archive-watermark absolute -right-16 bottom-8 z-0 select-none whitespace-nowrap text-[9vw] font-black uppercase tracking-[0.18em] text-parchment pointer-events-none select-none">
          CLASSIFIED
        </div>

        {/* Ambient HUD Telemetry */}
        <div className="absolute top-8 left-8 md:left-12 text-[8px] md:text-[9px] text-gold/35 font-mono uppercase tracking-[0.4em] flex flex-col gap-2 z-10 pointer-events-none hidden sm:flex">
          <span className="animate-pulse">SYS.OP // OPTIMAL</span>
          <span>MEM // {memAlloc}K ALLOCATED</span>
          <span>UPLINK // ESTABLISHED</span>
        </div>
        
        <div className="absolute top-8 right-8 md:right-12 text-[8px] md:text-[9px] text-gold/35 font-mono uppercase tracking-[0.4em] text-right flex flex-col gap-2 z-10 pointer-events-none hidden sm:flex">
          <span>COORD // 47&deg; 36' N, 122&deg; 19' W</span>
          <span>SECTOR // 7G</span>
          <span>T-MINUS // {String(Math.floor(elapsed/3600)).padStart(2,'0') + ':' + String(Math.floor((elapsed%3600)/60)).padStart(2,'0') + ':' + String(elapsed%60).padStart(2,'0')}</span>
        </div>
        <div className="absolute left-[11%] top-[32%] z-10 hidden h-2 w-2 rounded-full border border-gold/40 bg-gold/20 ambient-pulse md:block" />
        <div className="absolute right-[18%] top-[58%] z-10 hidden h-1.5 w-1.5 rounded-full border border-gold/30 bg-gold/10 ambient-pulse md:block" style={{ animationDelay: '1.4s' }} />
        <div className="absolute bottom-24 left-[22%] z-10 hidden w-36 border-t border-gold/15 md:block">
          <span className="absolute -top-2 left-0 h-1 w-1 rounded-full bg-gold/50"></span>
        </div>
        <div className="absolute bottom-20 right-[16%] z-10 hidden w-44 border-t border-gold/15 md:block">
          <span className="absolute -top-2 right-0 h-1 w-1 rounded-full bg-gold/50"></span>
        </div>

        {/* Main Dramatic Layout */}
        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 pt-6">
          <motion.div 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-1"
          >
            <StatusIndicator 
              state="standby" 
              label="INITIALIZING ARCHIVE" 
              className="px-3 py-1 border border-gold/30 text-gold/80 bg-espresso/60 backdrop-blur shadow-[0_0_22px_rgba(197,160,89,0.08)]"
            />
          </motion.div>
          
          <h1 className="flex flex-col items-center justify-center text-5xl sm:text-6xl md:text-8xl font-light tracking-tighter leading-none drop-shadow-[0_0_24px_rgba(197,160,89,0.16)] relative z-10">
            <div style={{ color: '#c8a96e' }} className="opacity-100">
              <GlitchText text="PRADYUMN" />
            </div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: showSubtitle ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] md:text-[12px] uppercase tracking-[0.9em] mt-4 block"
              style={{ color: 'rgba(200, 169, 110, 0.7)' }}
            >
              // THE ARCHIVIST
            </motion.span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 text-[8px] uppercase tracking-[0.38em] text-gold/35 font-mono">
            <span>NODE ACCESS // VERIFIED</span>
            <span className="hidden h-px w-12 bg-gold/20 sm:block"></span>
            <span>DOSSIER ACTIVE // LIVE</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="pt-4 flex items-center justify-center gap-8"
          >
            <Link to="/projects" className="crt-button group relative px-6 py-2 overflow-hidden border border-gold/40 text-[8px] font-bold tracking-[0.4em] uppercase text-gold hover:text-espresso transition-colors duration-500 inline-flex items-center gap-4 bg-espresso/40 backdrop-blur">
              <span className="relative z-10">Access Terminal</span>
              <span className="material-symbols-outlined relative z-10 text-[10px]">arrow_forward_ios</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Surveillance Terminal Ticker Strip */}
      <div className="relative h-9 bg-[#0e0c09] border-y border-gold/30 flex items-center overflow-hidden shadow-[0_0_12px_rgba(200,169,110,0.08)] group/ticker animate-ticker-pulse">
        {/* Environmental Overlays */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==')] mix-blend-overlay"></div>
        <div 
          className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none"
          style={{ animation: 'ticker-sweep 15s linear infinite' }}
        />

        <div className="flex w-max min-w-max animate-marquee hover:text-gold/90 transition-colors duration-300 animate-ticker-flicker whitespace-nowrap items-center" style={{ animationDuration: '48s' }}>
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex shrink-0 items-center text-[9px] text-gold/60 font-mono uppercase tracking-[0.3em]">
              {tickerItems.map((item, index) => (
                <div key={`${set}-${item}`} className="flex shrink-0 items-center">
                  <span className="shrink-0">{item}</span>
                  <StatusIndicator
                    state={index % 3 === 1 ? 'standby' : 'online'}
                    showLabel={false}
                    className="mx-12 shrink-0"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="relative z-10 bg-[#0e0c09] py-16 px-6 overflow-hidden">
        <div className="archive-fog absolute -inset-24 opacity-20 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Dossier Snapshot - Quote Style */}
            <div className="relative pl-12 border-l-2 border-gold/40">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[120px] text-gold/10 font-serif opacity-[0.07] pointer-events-none select-none">
                "
              </div>
              <p className="text-2xl md:text-3xl text-parchment leading-relaxed font-serif italic relative z-10">
                The architecture of information is not just about structure; it is about the ghosts we leave in the syntax.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-8 h-px bg-gold/30"></div>
                <span className="text-[10px] text-gold/60 uppercase tracking-widest font-mono">Archive // P. Thorne</span>
              </div>
            </div>

            {/* Stat Grid with Corner Brackets */}
            <div className="grid grid-cols-2 gap-4 relative">
              {[
                { 
                  label: 'Commits', 
                  val: githubCommits || 2400, 
                  icon: 'terminal', 
                  duration: 2500, 
                  delay: 0, 
                  formatter: commitsFormatter 
                },
                { label: 'Artifacts', val: 42, icon: 'deployed_code', duration: 2000, delay: 200, formatter: artifactsFormatter },
                { label: 'Sectors', val: 8, icon: 'grid_view', duration: 1500, delay: 400, formatter: sectionsFormatter },
                { label: 'Status', val: 'AVAILABLE', icon: 'fiber_manual_record', pulse: true },
              ].map((stat) => (
                <div key={stat.label} className="relative bg-gold/5 p-[20px] px-[24px] border border-gold/10 group overflow-hidden stat-sweep">
                  {/* Corner Brackets */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    {stat.pulse ? (
                      <StatusIndicator state="online" showLabel={false} />
                    ) : (
                      <span className="material-symbols-outlined text-sm text-gold/40">
                        {stat.icon}
                      </span>
                    )}
                    <span className="text-[8px] text-gold/50 uppercase tracking-[0.3em] font-mono">{stat.label}</span>
                  </div>
                  {typeof stat.val === 'number' && stat.val > 0 ? (
                    <StatCounter 
                      key={stat.val}
                      target={stat.val} 
                      duration={stat.duration} 
                      delay={stat.delay} 
                      formatter={stat.formatter} 
                    />
                  ) : (
                    <div className="text-xl font-bold text-parchment font-mono">
                      {stat.val === null ? (
                        <span className="opacity-40 animate-pulse">--</span>
                      ) : stat.val}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case File Upgrade */}
      <section className="py-16 px-6 bg-[#0e0c09]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-gold/60 text-[10px] uppercase tracking-[0.5em]">Primary Classification</span>
            <div className="flex-1 h-px bg-gold/10"></div>
          </div>
          
          <Link to="/projects" className="block group">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative p-12 border border-gold/20 overflow-hidden bg-[#1a1712] shadow-2xl"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(200,169,110,0.03) 0px, rgba(200,169,110,0.03) 1px, transparent 1px, transparent 10px)'
              }}
            >
              {/* Animated Corner Brackets */}
              <motion.div variants={{ initial: { top: 16, left: 16 }, animate: { top: 8, left: 8 } }} className="absolute w-4 h-4 border-t-2 border-l-2 border-gold/40"></motion.div>
              <motion.div variants={{ initial: { top: 16, right: 16 }, animate: { top: 8, right: 8 } }} className="absolute w-4 h-4 border-t-2 border-r-2 border-gold/40"></motion.div>
              <motion.div variants={{ initial: { bottom: 16, left: 16 }, animate: { bottom: 8, left: 8 } }} className="absolute w-4 h-4 border-b-2 border-l-2 border-gold/40"></motion.div>
              <motion.div variants={{ initial: { bottom: 16, right: 16 }, animate: { bottom: 8, right: 8 } }} className="absolute w-4 h-4 border-b-2 border-r-2 border-gold/40"></motion.div>

              {/* Watermark */}
              <div className="archive-watermark absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <span className="text-[180px] font-bold uppercase tracking-[0.2em] transform -rotate-[15deg] whitespace-nowrap">
                  CLASSIFIED
                </span>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      animate={{ color: ['#ef4444', '#c5a059', '#ef4444'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="px-3 py-1 border border-current text-[10px] font-bold uppercase tracking-widest"
                    >
                      DECLASSIFIED
                    </motion.div>
                    <span className="text-gold/40 font-mono text-[10px]">CASE_REF // ARCH-001</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-parchment uppercase tracking-tighter">Chronos Interface</h3>
                  <p className="text-ink-dim text-lg leading-relaxed font-serif italic">
                    A temporal data visualization dashboard for tracking high-frequency network anomalies across distributed systems.
                  </p>
                </div>
                <div className="flex flex-col justify-end items-end space-y-4">
                  <div className="text-right">
                    <span className="text-[10px] text-gold/40 uppercase block mb-1">Authorization</span>
                    <span className="text-xs text-parchment font-mono">LEVEL_4_CLEARED</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gold/40 uppercase block mb-1">Checksum</span>
                    <span className="text-xs text-parchment font-mono">0x4F2A9...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Chronicle Strip Timeline */}
      <section className="relative py-24 bg-[#1a1710] border-y border-gold/5 overflow-hidden">
        <div className="archive-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(100px,18vw,220px)] font-black uppercase tracking-[0.18em] text-gold pointer-events-none z-0">
          CHRONICLE
        </div>
        <div className="absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/[0.025] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <span className="text-gold material-symbols-outlined text-sm mb-2 animate-bounce">expand_more</span>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-gold/60">The Chronicle Strip</h2>
          </div>
          <ChronicleStrip />
        </div>
      </section>

      {/* Transmission CTA */}
      <section className="relative py-28 px-6 bg-[#0e0c09] overflow-hidden">
        <div className="archive-fog absolute -inset-24 opacity-28 pointer-events-none" />
        <div className="archive-watermark absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(80px,14vw,160px)] font-black uppercase tracking-[0.16em] text-gold pointer-events-none z-0">
          TRANSMISSION
        </div>
        {/* Full-width Divider with Text */}
        <div className="absolute top-0 left-0 z-20 w-full border-t border-gold/10 pt-5 text-center">
          <span className="inline-block px-5 bg-[#0e0c09] text-[9px] text-gold/50 uppercase tracking-[0.65em] font-mono whitespace-nowrap">
            // TRANSMISSION OPEN //
          </span>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10">
          <h2 className="text-4xl md:text-6xl italic font-light text-gold tracking-widest uppercase leading-tight">
            Ready to Forge the<br/>Next Artifact?
          </h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center"
          >
            <Link 
              to="/contact" 
              className="crt-button group relative px-12 py-5 bg-transparent border border-gold/40 text-[10px] font-bold tracking-[0.5em] uppercase text-gold overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-espresso transition-colors duration-300">Open a Channel</span>
              
              {/* Background Fill */}
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              
              {/* Static Flicker Overlay on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:animate-[flicker_0.15s_infinite] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==')] mix-blend-overlay"></div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
