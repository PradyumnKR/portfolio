import { motion } from 'framer-motion';

export default function Resume() {
  const experiences = [
    {
      period: "JAN 2026 — PRESENT",
      role: "ASSOCIATE SERVICENOW DEVELOPER INTERN",
      org: "Netsmartz Infotech",
      desc: "Developed and automated 10+ enterprise workflows using Business Rules, Client Scripts, and Script Includes. Worked across Incident, Problem, and Change ITSM modules configuring forms, ACLs, and flows.",
      tags: ["SERVICENOW", "ITSM", "JAVASCRIPT", "GLIDERECORD"]
    }
  ];

  const education = [
    {
      period: "2022 — 2026",
      degree: "B.TECH — AI & DATA SCIENCE",
      school: "JECRC, Jaipur",
      details: "CGPA: 9.7/10. Relevant coursework: DSA, OOP, DBMS, OS, Computer Networks."
    },
    {
      period: "2021 — 2022",
      degree: "HIGHER SECONDARY — SCIENCE",
      school: "Kendriya Vidyalaya No.1, Udaipur",
      details: "Percentage: 95%. CBSE Science Stream."
    },
    {
      period: "2019 — 2020",
      degree: "SECONDARY — SCIENCE STREAM",
      school: "Kendriya Vidyalaya No.1, Udaipur",
      details: "Percentage: 85.8%. CBSE Board. First formal encounter with structured logic and the architecture of knowledge."
    }
  ];

  return (
    <div className="dossier-page bg-[#1a1710] parchment-grain min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative">
      {/* Decorative Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold/20"></div>
      
      <main className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 border-b border-gold/20 pb-10 sm:pb-12 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-wax-red/30 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-wax-red bg-wax-red/5">
              Top Secret // Personnel File
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-parchment tracking-tighter uppercase leading-none">PRADYUMN KUMAR SHUKLA</h1>
            <p className="text-gold/60 text-base sm:text-lg font-serif italic">Subject #2004 // AI & Full Stack Engineer</p>
          </div>
          
          <motion.a
            href="/resume.pdf"
            download="Pradyumn_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full sm:w-auto px-8 py-3.5 sm:py-3 bg-gold text-espresso font-bold text-[10px] sm:text-xs uppercase tracking-[0.4em] overflow-hidden inline-block text-center whitespace-nowrap"
          >
            <span className="relative z-10">Declassify Resume </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-20deg]"></div>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 items-start">
          {/* Sidebar Info */}
          <div className="space-y-8 order-2 md:order-1">
            <section className="space-y-4">
              <h2 className="text-[9px] sm:text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] border-b border-gold/10 pb-2 font-mono">Classification</h2>
              <ul className="text-xs text-ink-dim space-y-2 font-mono">
                <li className="flex justify-between"><span>CLEARANCE:</span> <span className="text-gold">LEVEL 9.7</span></li>
                <li className="flex justify-between"><span>SECTOR:</span> <span className="text-gold">AI & FULL-STACK</span></li>
                <li className="flex justify-between"><span>STATUS:</span> <span className="text-gold">ACTIVE</span></li>
              </ul>
            </section>

            <div className="h-px w-full bg-[#c8a96e]/10 my-6"></div>

            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] border-b border-gold/10 pb-2 font-mono">Tactical Link</h2>
              <ul className="text-xs text-ink-dim space-y-4 font-mono">
                <li>
                  <a 
                    href="mailto:pradyumnkrshukla.4672@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group cursor-pointer text-ink-dim hover:text-[#c8a96e] hover:opacity-100 hover:border-l-2 hover:border-[#c8a96e] hover:pl-1.5 transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                    pradyumnkrshukla.4672@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group cursor-pointer text-ink-dim hover:text-[#c8a96e] hover:opacity-100 hover:border-l-2 hover:border-[#c8a96e] hover:pl-1.5 transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-sm">language</span>
                    pradyumn.dev
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/PradyumnKR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group cursor-pointer text-ink-dim hover:text-[#c8a96e] hover:opacity-100 hover:border-l-2 hover:border-[#c8a96e] hover:pl-1.5 transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-sm">terminal</span>
                    github.com/PradyumnKR
                  </a>
                </li>
              </ul>
            </section>

            <div className="h-px w-full bg-[#c8a96e]/10 my-6"></div>

            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] border-b border-gold/10 pb-2 font-mono">Core Arsenal</h2>
              <div className="flex flex-wrap gap-2">
                {["JAVASCRIPT", "PYTHON", "C++", "SQL", "REACT.JS", "TAILWIND CSS", "FRAMER MOTION", "NODE.JS", "EXPRESS.JS", "REST APIs", "MONGODB", "MYSQL", "GIT", "VITE", "VERCEL"].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gold/5 border border-gold/10 text-[9px] uppercase tracking-widest text-parchment/70 font-mono hover:bg-[#c8a96e]/12 hover:border-[#c8a96e] hover:text-[#c8a96e] hover:opacity-100 transition-all duration-200 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <div className="h-px w-full bg-[#c8a96e]/10 my-6"></div>

            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] border-b border-gold/10 pb-2 font-mono">Certifications // Clearances</h2>
              <ul className="space-y-2 font-mono">
                {[
                  "SERVICENOW CSA",
                  "SERVICENOW CAD",
                  "RUNNER-UP // SMART INDIA HACKATHON PRELIMS 2023"
                ].map((cert) => (
                  <li key={cert} className="flex items-center text-[12px] text-[rgba(240,234,216,0.8)] hover:text-[#c8a96e] transition-all duration-200 group cursor-default">
                    <span className="text-[#c8a96e] opacity-50 group-hover:opacity-100 mr-2 transition-all duration-200">›</span>
                    {cert.toUpperCase()}
                  </li>
                ))}
              </ul>
            </section>

            <div className="h-px w-full bg-[#c8a96e]/10 my-6"></div>

            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] border-b border-gold/10 pb-2 font-mono">Operative Languages</h2>
              <div className="grid grid-cols-2 gap-y-2 font-mono">
                <div className="text-[11px] text-[rgba(240,234,216,0.75)]">ENGLISH</div>
                <div className="text-[10px] text-[#c8a96e] opacity-60 tracking-[0.1em] text-right uppercase">PROFESSIONAL</div>
                <div className="text-[11px] text-[rgba(240,234,216,0.75)]">HINDI</div>
                <div className="text-[10px] text-[#c8a96e] opacity-60 tracking-[0.1em] text-right">NATIVE</div>
              </div>
            </section>

            <div className="h-px w-full bg-[#c8a96e]/10 my-6"></div>

            <section className="space-y-4">
              <h2 className="text-[10px] font-bold text-gold/60 uppercase tracking-[0.2em] border-b border-gold/10 pb-2 font-mono">Availability Signal</h2>
              <div className="space-y-3 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#3aff6a] animate-[statusPulseOnline_2s_ease-in-out_infinite]"></div>
                  <span className="text-[12px] text-[rgba(240,234,216,0.8)] uppercase">Open to Opportunities</span>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] text-gold opacity-60 uppercase">Response Time: 24—48 Hrs</div>
                  <div className="text-[11px] text-gold opacity-60 uppercase">Preferred: Remote // Hybrid</div>
                </div>
              </div>
            </section>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-12 sm:space-y-16 pb-16 order-1 md:order-2">
            <section className="space-y-8">
              <h2 className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-[0.4em] sm:tracking-[0.5em] flex items-center gap-4">
                Operational Experience
                <div className="flex-1 h-px bg-gold/10"></div>
              </h2>
              
              <div className="space-y-10 sm:space-y-12">
                {experiences.map((exp, i) => {
                  const isCurrent = exp.period.includes("PRESENT");
                  return (
                  <div key={i} className="relative pl-6 sm:pl-8 border-l border-gold/10">
                    <div className={`absolute -left-[5px] top-[6px] w-[8px] h-[8px] rounded-full shrink-0 ${isCurrent ? 'bg-[#c8a96e] animate-[goldPulse_2s_ease-in-out_infinite]' : 'bg-[#c8a96e] shadow-[0_0_6px_2px_rgba(200,169,110,0.4)]'}`}></div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-gold/40 block mb-2">{exp.period}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-parchment uppercase tracking-tight mb-1">{exp.role}</h3>
                    <p className="text-gold/60 text-sm font-serif italic mb-4">{exp.org}</p>
                    <p className="text-sm text-ink-dim leading-relaxed mb-4">{exp.desc}</p>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[9px] sm:text-[10px] text-[#c8a96e] opacity-50 font-mono uppercase tracking-widest">#{tag.replace(/\s+/g, '_')}</span>
                      ))}
                    </div>
                  </div>
                  );
                })}
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-[0.4em] sm:tracking-[0.5em] flex items-center gap-4">
                Education / Origins
                <div className="flex-1 h-px bg-gold/10"></div>
              </h2>
              
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-6 sm:pl-8 border-l border-gold/10">
                    <div className="absolute -left-[5px] top-[6px] w-[8px] h-[8px] rounded-full shrink-0 bg-[#c8a96e] shadow-[0_0_6px_2px_rgba(200,169,110,0.4)]"></div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-gold/40 block mb-2">{edu.period}</span>
                    <h3 className="text-base sm:text-lg font-bold text-parchment uppercase tracking-tight mb-1">{edu.degree}</h3>
                    <p className="text-gold/60 text-sm font-serif italic mb-2">{edu.school}</p>
                    <p className="text-sm text-ink-dim leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
