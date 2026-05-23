import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  {
    category: "Primary Armament // Languages",
    items: [
      { name: "JavaScript / TypeScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "SQL", level: 75 },
      { name: "HTML / CSS", level: 95 }
    ]
  },
  {
    category: "Tactical Gear // Frontend",
    items: [
      { name: "React / Vite", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 80 },
      { name: "Next.js", level: 70 }
    ]
  },
  {
    category: "Power Source // Backend",
    items: [
      { name: "Node.js / Express", level: 82 },
      { name: "FastAPI / Python", level: 78 },
      { name: "PostgreSQL", level: 75 },
      { name: "Redis", level: 60 }
    ]
  },
  {
    category: "Support Kit // Tools",
    items: [
      { name: "Git / Github", level: 90 },
      { name: "Docker", level: 65 },
      { name: "Postman / Insomnia", level: 85 },
      { name: "Figma", level: 70 }
    ]
  }
];

const ArsenalMeter = ({ level }) => {
  const bars = 20;
  const filledBarsCount = Math.round(level / 5);
  const containerRef = useRef(null);
  const cellsRef = useRef([]);
  const timeoutsRef = useRef([]);
  const waveTimeoutRef = useRef(null);

  const startPulseWave = useCallback(() => {
    const initialDelay = Math.random() * 1500;
    
    const runWave = () => {
      for (let i = 0; i < filledBarsCount; i++) {
        const cell = cellsRef.current[i];
        if (!cell) continue;

        const brightenTimeout = setTimeout(() => {
          cell.style.background = '#e8c87e';
          cell.style.boxShadow = '0 0 8px 3px rgba(200,169,110,0.7)';
          cell.style.transition = 'all 60ms ease-out';
          
          const dimTimeout = setTimeout(() => {
            cell.style.background = '#c8a96e';
            cell.style.boxShadow = 'none';
            cell.style.transition = 'all 120ms ease-in';
          }, 120);
          
          timeoutsRef.current.push(dimTimeout);
        }, i * 40);
        
        timeoutsRef.current.push(brightenTimeout);
      }

      waveTimeoutRef.current = setTimeout(runWave, 3500);
    };

    waveTimeoutRef.current = setTimeout(runWave, initialDelay);
  }, [filledBarsCount]);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;
    
    // Prevent double-firing in strict mode if already animated
    if (currentRef.getAttribute('data-animated') === 'true') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && currentRef.getAttribute('data-animated') !== 'true') {
          currentRef.setAttribute('data-animated', 'true');
          
          if (filledBarsCount === 0) {
            setTimeout(() => {
              currentRef.setAttribute('data-fill-complete', 'true');
              startPulseWave();
            }, 80);
            return;
          }

          for (let i = 0; i < filledBarsCount; i++) {
            const timeout = setTimeout(() => {
              if (cellsRef.current[i]) {
                cellsRef.current[i].classList.remove('cell-unfilled');
                cellsRef.current[i].classList.add('cell-filled');
              }
              
              if (i === filledBarsCount - 1) {
                setTimeout(() => {
                  currentRef.setAttribute('data-fill-complete', 'true');
                  startPulseWave();
                }, 80);
              }
            }, i * 35);
            
            timeoutsRef.current.push(timeout);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [filledBarsCount, startPulseWave]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutsRef.current.forEach(clearTimeout);
      if (waveTimeoutRef.current) clearTimeout(waveTimeoutRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col gap-1 w-full skill-bar" 
      data-animated="false"
      data-fill-complete="false"
    >
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-gold/60">
        <span>Capacity</span>
        <span>{level}%</span>
      </div>
      <div className="flex gap-[2px] h-[10px] w-full">
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            ref={el => cellsRef.current[i] = el}
            className="h-full transition-all duration-0 cell-unfilled"
            style={{ width: `calc((100% / ${bars}) - 2px)` }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <div className="arsenal-page bg-[#1a1710] min-h-screen py-24 px-6 overflow-hidden relative">
      <div className="absolute inset-0 rain-effect opacity-10 pointer-events-none"></div>
      
      <main className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-gold/10 pb-8 gap-6"
        >
          <div className="space-y-3 text-left">
            <span className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-gold/60 block">Tactical Loadout // Arsenal</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gold tracking-tighter uppercase leading-none">The Weapons Manifest</h1>
          </div>
          <div className="text-left md:text-right w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-8 md:gap-2 border-t border-gold/5 pt-4 md:border-none md:pt-0">
            <p className="text-[9px] sm:text-[10px] text-ink-dim uppercase tracking-[0.2em] sm:tracking-[0.3em]">Operator Status: <span className="text-gold">Combat Ready</span></p>
            <p className="text-[9px] sm:text-[10px] text-gold uppercase tracking-[0.2em] sm:tracking-[0.3em]">Unit ID: PRADYUMN_KR_V1.0</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {SKILLS.map((group, groupIndex) => (
            <motion.section 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              className="bg-gold/5 border border-gold/12 border-t-gold/35 p-6 sm:p-8 group hover:bg-gold/[0.08] transition-all rounded-none shadow-xl"
            >
              <h2 className="text-xs sm:text-sm font-bold text-gold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-10 flex items-center gap-4">
                <span className="size-2 bg-wax-red animate-pulse shrink-0"></span>
                {group.category}
              </h2>
              
              <div className="space-y-10 sm:space-y-12">
                {group.items.map((skill) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                      <span className="text-xs font-bold text-parchment uppercase tracking-widest">{skill.name}</span>
                      <span className="w-fit text-[8px] sm:text-[9px] font-mono text-gold/75 uppercase tracking-[0.15em] border border-gold/40 px-[6px] py-[2px]">AUTHORIZED_USE</span>
                    </div>
                    <ArsenalMeter level={skill.level} />
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Tactical Overlay Elements */}
        <div className="mt-20 flex justify-center">
          <div className="px-6 sm:px-10 py-5 border border-gold/20 flex flex-col sm:flex-row gap-8 sm:gap-16 md:gap-24 bg-espresso/40 backdrop-blur-sm relative overflow-hidden group/overlay">
            <div className="absolute inset-0 scan-beam opacity-5 pointer-events-none"></div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[8px] text-gold/60 uppercase tracking-widest">Energy Grid</span>
              <div className="flex gap-[2px]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-[10px] bg-gold opacity-80" />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[8px] text-gold/60 uppercase tracking-widest">Network_Sync</span>
              <span className="text-[10px] text-parchment/85 font-mono uppercase tracking-wider">STABLE_CONNECTED</span>
            </div>
            
            <div className="flex flex-col gap-2 sm:text-right">
              <span className="text-[8px] text-gold/60 uppercase tracking-widest">Manifest_v1.0</span>
              <span className="text-[10px] text-parchment/85 font-mono tracking-wider">05.07.2026</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
