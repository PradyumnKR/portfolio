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

const AmmoMeter = ({ level }) => {
  const bars = 20;
  const filledBars = Math.floor((level / 100) * bars);
  
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-gold/60">
        <span>Capacity</span>
        <span>{level}%</span>
      </div>
      <div className="flex gap-1 h-3 w-full">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`flex-1 ${i < filledBars ? 'bg-gold' : 'bg-gold/10'} border border-gold/20`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <div className="bg-espresso min-h-screen py-24 px-6 overflow-hidden relative">
      <div className="absolute inset-0 rain-effect opacity-10 pointer-events-none"></div>
      
      <main className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-gold/10 pb-8"
        >
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] uppercase text-gold/60 block">Tactical Loadout // Arsenal</span>
            <h1 className="text-5xl font-light text-gold tracking-tighter uppercase">The Weapons Manifest</h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-ink-dim uppercase tracking-[0.3em]">Operator Status: Combat Ready</p>
            <p className="text-[10px] text-gold uppercase tracking-[0.3em]">Unit ID: JULIAN_THORNE_v9.4</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {SKILLS.map((group, groupIndex) => (
            <motion.section 
              key={group.category}
              initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: groupIndex * 0.2 }}
              className="bg-gold/5 border border-gold/10 p-8 gold-leaf-border group hover:bg-gold/[0.08] transition-all"
            >
              <h2 className="text-sm font-bold text-gold uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                <span className="size-2 bg-wax-red animate-pulse"></span>
                {group.category}
              </h2>
              
              <div className="space-y-10">
                {group.items.map((skill) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-parchment uppercase tracking-widest">{skill.name}</span>
                      <span className="text-[9px] text-gold/40 uppercase tracking-widest">Authorized_Use</span>
                    </div>
                    <AmmoMeter level={skill.level} />
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Tactical Overlay Elements */}
        <div className="mt-20 flex justify-center opacity-30">
          <div className="px-10 py-4 border border-gold/20 flex gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] text-gold uppercase tracking-widest">Energy Grid</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-gold/60" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] text-gold uppercase tracking-widest">Network_Sync</span>
              <span className="text-[10px] text-parchment font-mono">STABLE_CONNECTED</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="text-[8px] text-gold uppercase tracking-widest">Manifest_v1.0</span>
              <span className="text-[10px] text-parchment font-mono">05.07.2026</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
