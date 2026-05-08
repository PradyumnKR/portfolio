import { motion } from 'framer-motion';

const ChronicleStrip = () => {
  const events = [
    { year: '2020', text: 'First Neural Map Deployment' },
    { year: '2021', text: 'Archival System Beta' },
    { year: '2022', text: 'Aether Dynamics Launch' },
    { year: '2023', text: 'Temporal Interface V2' },
    { year: '2024', text: 'Syllabus Core Complete' },
    { year: '2025', text: 'Dossier Indexing Active' },
  ];

  const duplicatedEvents = [...events, ...events, ...events];

  return (
    <div className="w-full overflow-hidden py-14 relative group chronicle-focus-mask">
      <div className="absolute left-1/2 top-0 z-20 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/45 to-transparent pointer-events-none"></div>
      <div className="absolute left-1/2 top-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 bg-gold/20 ambient-pulse pointer-events-none"></div>
      <div className="absolute inset-y-8 left-1/2 z-10 w-[340px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(197,160,89,0.16),transparent_68%)] blur-2xl pointer-events-none"></div>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gold/15 pointer-events-none"></div>
      
      <motion.div 
        animate={{ x: [0, -152 * events.length] }}
        transition={{ 
          duration: 38, 
          repeat: Infinity, 
          ease: "linear",
          repeatType: "loop"
        }}
        className="flex gap-4 w-max"
        style={{ pauseOnHover: true }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedEvents.map((event, i) => (
          <div 
            key={i} 
            className="w-[136px] h-[92px] bg-[#120d09]/90 border border-gold/20 relative flex flex-col justify-between p-3 shrink-0 shadow-[0_0_24px_rgba(0,0,0,0.55)] transition-colors duration-300 group-hover:border-gold/35"
          >
            {/* Sprocket Holes */}
            <div className="absolute left-1 top-1 w-2 h-2 rounded-full bg-paper-dark border border-gold/30"></div>
            <div className="absolute left-1 bottom-1 w-2 h-2 rounded-full bg-paper-dark border border-gold/30"></div>
            <div className="absolute right-1 top-1 w-2 h-2 rounded-full bg-paper-dark border border-gold/20"></div>
            <div className="absolute right-1 bottom-1 w-2 h-2 rounded-full bg-paper-dark border border-gold/20"></div>
            <div className="absolute inset-x-0 top-1/2 h-px bg-gold/10"></div>
            
            <span className="text-[9px] font-mono text-gold/90 self-end uppercase tracking-widest">[{event.year}]</span>
            <p className="text-[10px] text-parchment/80 leading-tight uppercase tracking-[0.04em]">
              {event.text}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ChronicleStrip;
