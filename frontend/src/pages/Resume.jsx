import { motion } from 'framer-motion';

export default function Resume() {
  const experiences = [
    {
      period: "2022 — PRESENT",
      role: "Lead Systems Architect",
      org: "Aether Dynamics",
      desc: "Spearheaded the development of distributed real-time telemetry systems. Reduced system-wide latency by 45% through implementation of custom protocol buffers.",
      tags: ["Distributed Systems", "Rust", "Protocol Buffers"]
    },
    {
      period: "2020 — 2022",
      role: "Senior Software Engineer",
      org: "Vesper Research Labs",
      desc: "Developed neural mapping algorithms for historical text analysis. Built an automated archival system handling 50k+ daily ingestions.",
      tags: ["Python", "NLP", "Data Engineering"]
    },
    {
      period: "2018 — 2020",
      role: "Full Stack Developer",
      org: "Digital Scriptorium",
      desc: "Designed and maintained high-performance UI components for archival exploration. Integrated blockchain for immutable record tracking.",
      tags: ["React", "Node.js", "Web3"]
    }
  ];

  const education = [
    {
      period: "2014 — 2018",
      degree: "B.S. in Computer Science",
      school: "The University of Arcane Arts",
      details: "Specialized in Computational Linguistics and Ancient Algorithmics."
    }
  ];

  return (
    <div className="bg-espresso parchment-grain min-h-screen py-24 px-6 relative">
      {/* Decorative Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold/20"></div>
      
      <main className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-gold/20 pb-12 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-wax-red/30 text-[9px] uppercase tracking-[0.3em] text-wax-red bg-wax-red/5">
              Top Secret // Personnel File
            </div>
            <h1 className="text-6xl font-bold text-parchment tracking-tighter uppercase">Julian Thorne</h1>
            <p className="text-gold/60 text-lg font-serif italic">Subject #8472 // Senior Software Architect</p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3 bg-gold text-espresso font-bold text-xs uppercase tracking-[0.4em] overflow-hidden"
          >
            <span className="relative z-10">Declassify Resume</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Sidebar Info */}
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] border-b border-gold/10 pb-2">Classification</h2>
              <ul className="text-xs text-ink-dim space-y-2 font-mono">
                <li className="flex justify-between"><span>CLEARANCE:</span> <span className="text-gold">LEVEL 5</span></li>
                <li className="flex justify-between"><span>SECTOR:</span> <span className="text-gold">ENGINEERING</span></li>
                <li className="flex justify-between"><span>STATUS:</span> <span className="text-gold">ACTIVE</span></li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] border-b border-gold/10 pb-2">Tactical Link</h2>
              <ul className="text-xs text-ink-dim space-y-4">
                <li className="flex items-center gap-3 group cursor-pointer hover:text-gold transition-colors">
                  <span className="material-symbols-outlined text-sm">alternate_email</span>
                  julian@scriptorium.net
                </li>
                <li className="flex items-center gap-3 group cursor-pointer hover:text-gold transition-colors">
                  <span className="material-symbols-outlined text-sm">language</span>
                  julianthorne.dev
                </li>
                <li className="flex items-center gap-3 group cursor-pointer hover:text-gold transition-colors">
                  <span className="material-symbols-outlined text-sm">terminal</span>
                  github.com/jthorne
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] border-b border-gold/10 pb-2">Core Arsenal</h2>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Rust", "Python", "React", "FastAPI", "PostgreSQL", "Docker", "AWS"].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gold/5 border border-gold/10 text-[9px] uppercase tracking-widest text-parchment/70">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-16">
            <section className="space-y-8">
              <h2 className="text-xs font-bold text-gold uppercase tracking-[0.5em] flex items-center gap-4">
                Operational Experience
                <div className="flex-1 h-px bg-gold/10"></div>
              </h2>
              
              <div className="space-y-12">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-gold/10">
                    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-gold/20 border border-gold/40"></div>
                    <span className="text-[10px] font-mono text-gold/40 block mb-2">{exp.period}</span>
                    <h3 className="text-xl font-bold text-parchment uppercase tracking-tight mb-1">{exp.role}</h3>
                    <p className="text-gold/60 text-sm font-serif italic mb-4">{exp.org}</p>
                    <p className="text-sm text-ink-dim leading-relaxed mb-4">{exp.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[9px] text-gold/40 font-mono uppercase tracking-widest">#{tag.replace(/\s+/g, '_')}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-xs font-bold text-gold uppercase tracking-[0.5em] flex items-center gap-4">
                Education / Origins
                <div className="flex-1 h-px bg-gold/10"></div>
              </h2>
              
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-8 border-l border-gold/10">
                    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-gold/20 border border-gold/40"></div>
                    <span className="text-[10px] font-mono text-gold/40 block mb-2">{edu.period}</span>
                    <h3 className="text-lg font-bold text-parchment uppercase tracking-tight mb-1">{edu.degree}</h3>
                    <p className="text-gold/60 text-sm font-serif italic mb-2">{edu.school}</p>
                    <p className="text-sm text-ink-dim leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer Markings */}
        <div className="mt-24 pt-12 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30">
          <div className="text-[8px] uppercase tracking-[0.4em] text-gold">
            Archive Maintenance // Julian Thorne Personnel Record
          </div>
          <div className="flex gap-8 font-mono text-[8px]">
            <span>RECORD_HASH: 0x9A32F...</span>
            <span>SYSTEM_STAMP: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
