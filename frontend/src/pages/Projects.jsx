import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusIndicator from '../components/StatusIndicator';

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All_Files');

  const projects = [
    { 
      id: 'ARCH-001', 
      title: "SCRIBE'S CIPHER", 
      desc: "A secure password and passphrase generator with real-time entropy estimation and crack-time prediction. Built with React 19, Tailwind CSS 4, and Framer Motion.", 
      fullDesc: "A secure password and passphrase generator with real-time entropy estimation and crack-time prediction. Built with React 19, Tailwind CSS 4, and Framer Motion.",
      cat: 'Frontend', 
      status: 'Deployed', 
      access: 'Public_Repo',
      year: '2026',
      collab: 'Solo Operation',
      tech: ['REACT 19', 'TAILWIND CSS 4', 'FRAMER MOTION', 'ZXCVBN', 'VITE'],
      github: 'https://github.com/PradyumnKR/password-generator',
      live: 'https://scribes-cipher-nu-one-99.vercel.app/',
      img: null
    },
    { 
      id: 'ARCH-002', 
      title: 'FILE SORTER', 
      desc: 'A desktop automation utility that recursively organises files across 150+ extensions into 23 smart categories.', 
      fullDesc: 'A desktop automation utility that recursively organises files across 150+ extensions into 23 smart categories. Features dry-run preview and undo support for safe file operations.',
      cat: 'Engineering', 
      status: 'Completed', 
      access: 'Restricted',
      year: '2026',
      collab: 'Solo Operation',
      tech: ['PYTHON', 'CUSTOMTKINTER', 'PYINSTALLER'],
      github: 'https://gitlab.com/PradyumnKR/file-sorter',
      live: '#',
      img: null
    },
    { 
      id: 'ARCH-003', 
      title: 'FRAUD DETECTION ENGINE', 
      desc: 'A Random Forest model trained on 280K+ transactions with SMOTE oversampling, achieving 0.92 recall for real-time fraud prediction.', 
      fullDesc: 'A Random Forest model trained on 280K+ transactions with SMOTE oversampling, achieving 0.92 recall for real-time fraud prediction. Interactive Streamlit UI for non-technical users.',
      cat: 'Research', 
      status: 'Deployed', 
      access: 'Open_Source',
      year: '2025',
      collab: 'Solo Operation',
      tech: ['PYTHON', 'SCIKIT-LEARN', 'SMOTE', 'STREAMLIT'],
      github: 'https://github.com/PradyumnKR/credit-card-fraud-detection-app',
      live: 'https://credit-card-fraud-detection-app-nsnthwqeb243xo4duqocua.streamlit.app',
      img: null
    },
    { 
      id: 'ARCH-004', 
      title: 'THIS PORTFOLIO', 
      desc: 'A dark academia meets survival horror terminal portfolio. Built with React, Tailwind CSS, and Framer Motion.', 
      fullDesc: 'A dark academia meets survival horror terminal portfolio. Built with React, Tailwind CSS, and Framer Motion. Features ambient audio, custom cursor, CRT effects, and classified document aesthetic throughout.',
      cat: 'Design', 
      status: 'Deployed', 
      access: 'Internal',
      year: '2026',
      collab: 'Solo Operation',
      tech: ['REACT', 'TAILWIND CSS', 'FRAMER MOTION', 'VITE'],
      github: 'https://github.com/PradyumnKR/portfolio',
      live: '#',
      img: null
    },
  ];

  const getStatusState = (status) => {
    if (status === 'Deployed' || status === 'Completed') return 'online';
    if (status === 'Ongoing') return 'standby';
    return 'offline';
  };

  const filteredProjects = activeFilter === 'All_Files' 
    ? projects 
    : projects.filter(p => p.cat.toLowerCase() === activeFilter.toLowerCase());

  const selectedProjectIndex = selectedProjectId ? projects.findIndex(p => p.id === selectedProjectId) : -1;
  const selectedProject = selectedProjectId ? projects[selectedProjectIndex] : null;

  return (
    <div className="projects-page bg-[#1a1710] parchment-grain min-h-screen py-24">
      <main className="max-w-[1400px] mx-auto w-full px-6 lg:px-20 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero Section */}
              <div className="mb-10 sm:mb-12 border-l-4 border-gold pl-4 sm:pl-6 py-2 text-left">
                <h1 className="text-parchment text-3xl sm:text-5xl font-bold leading-tight tracking-tighter mb-4 uppercase">Project Compendium</h1>
                <p className="text-gold/70 text-base sm:text-lg max-w-2xl font-light italic">
                  A rigorous classification of digital artifacts, architectural experiments, and investigative research conducted between 2024—2026.
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-10 border-b border-gold/10 pb-8 relative z-10">
                <button 
                  onClick={() => setActiveFilter('All_Files')}
                  className={`flex h-9 sm:h-10 items-center justify-center gap-x-2 rounded px-4 sm:px-5 font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all ${activeFilter === 'All_Files' ? 'bg-gold text-espresso' : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}>
                  [00] All_Files
                </button>
                {['Design', 'Engineering', 'Research'].map((cat, i) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveFilter(cat)}
                    className={`flex h-9 sm:h-10 items-center justify-center gap-x-2 rounded px-4 sm:px-5 font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-gold text-espresso' : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}>
                    [0{i+1}] {cat}
                  </button>
                ))}
              </div>

              {/* Grid of Catalog Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
                {filteredProjects.map((project, i) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className="group h-full"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="project-bracket h-full"
                    >
                      <div className="project-card-inner bg-gold/5 p-6 flex flex-col gold-edge text-left">
                        <div className="flex justify-between items-start mb-6 relative z-30">
                          <div className="bg-gold/20 text-gold text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest group-hover:bg-gold group-hover:text-espresso transition-colors">Ref. #{project.id}</div>
                          <div className="text-gold/40 text-[10px] font-bold">EST. {project.year}</div>
                        </div>
                        <h3 className="text-parchment text-xl font-bold mb-2 uppercase tracking-tight group-hover:text-gold transition-colors relative z-30">{project.title}</h3>
                        <p className="text-ink-dim text-sm mb-6 leading-relaxed flex-grow relative z-30">{project.desc}</p>
                        <div className="border-t border-gold/10 pt-4 flex flex-col gap-3 relative z-30">
                          <div className="flex justify-between text-[11px] uppercase tracking-wider">
                            <span className="text-gold/50">Category</span>
                            <span className="text-parchment/80">{project.cat}</span>
                          </div>
                          <div className="flex justify-between text-[11px] uppercase tracking-wider">
                            <span className="text-gold/50">Status</span>
                            <StatusIndicator 
                              state={getStatusState(project.status)} 
                              label={project.status} 
                              className="text-parchment"
                            />
                          </div>
                          <div className="flex justify-between text-[11px] uppercase tracking-wider group-hover:text-gold transition-colors">
                            <span className="text-gold/50">Access</span>
                            <span className="uppercase">VIEW DOSSIER →</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Tabular Index (Footer View) */}
              <div className="mt-[72px] mb-[80px] border-t border-[rgba(200,169,110,0.2)] pt-10 text-left">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-[#f0ead8] text-xl font-bold uppercase tracking-widest">Tabular Index</h2>
                  <button className="border border-[rgba(200,169,110,0.3)] bg-transparent text-[#c8a96e] font-mono text-[10px] tracking-[0.15em] px-[14px] py-[6px] uppercase hover:bg-[rgba(200,169,110,0.08)] transition-colors flex items-center gap-2">
                    <span>&darr;</span> EXPORT PDF
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[rgba(200,169,110,0.25)]">
                        <th className="px-4 pb-[10px] text-[10px] text-[#c8a96e] font-mono uppercase tracking-[0.15em]">Index_IO</th>
                        <th className="px-4 pb-[10px] text-[10px] text-[#c8a96e] font-mono uppercase tracking-[0.15em]">Project_Title</th>
                        <th className="px-4 pb-[10px] text-[10px] text-[#c8a96e] font-mono uppercase tracking-[0.15em]">Classification</th>
                        <th className="px-4 pb-[10px] text-[10px] text-[#c8a96e] font-mono uppercase tracking-[0.15em]">Year</th>
                        <th className="px-4 pb-[10px] text-[10px] text-[#c8a96e] font-mono uppercase tracking-[0.15em]">State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((p) => (
                        <tr key={p.id} onClick={() => setSelectedProjectId(p.id)} className="border-b border-[rgba(200,169,110,0.08)] hover:bg-[rgba(200,169,110,0.04)] transition-colors duration-200 cursor-pointer group">
                          <td className="px-4 py-[12px] text-[11px] font-mono text-[#c8a96e] opacity-60">#{p.id.split('-')[1]}</td>
                          <td className="px-4 py-[12px] text-[12px] font-bold text-[#f0ead8] opacity-80 group-hover:text-[#c8a96e] uppercase tracking-wide">{p.title}</td>
                          <td className="px-4 py-[12px]">
                            <span className="text-[10px] border border-[rgba(200,169,110,0.2)] bg-[rgba(200,169,110,0.05)] px-2 py-0.5 font-mono text-[#c8a96e] uppercase tracking-widest">{p.cat}</span>
                          </td>
                          <td className="px-4 py-[12px] text-[11px] font-mono text-[rgba(240,234,216,0.5)]">{p.year}</td>
                          <td className="px-4 py-[12px]">
                            <div className="flex items-center gap-2">
                              <div className={`w-[6px] h-[6px] rounded-full ${p.status === 'Deployed' || p.status === 'Completed' ? 'bg-green-500 animate-pulse' : p.status === 'Ongoing' ? 'bg-amber-500 animate-pulse' : 'bg-red-500 animate-[pulse_3s_ease-in-out_infinite]'}`}></div>
                              <span className="text-[10px] font-mono text-[rgba(240,234,216,0.6)] uppercase tracking-wider">
                                {p.status === 'Deployed' || p.status === 'Completed' ? 'Complete' : p.status === 'Ongoing' ? 'Active' : 'Archived'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center mb-12">
                <button 
                  onClick={() => setSelectedProjectId(null)}
                  className="font-mono text-[11px] text-[#c8a96e] opacity-70 hover:opacity-100 transition-opacity uppercase tracking-tighter"
                >
                  &larr; RETURN TO COMPENDIUM
                </button>
                <span className="font-mono text-[10px] text-[#c8a96e] opacity-50 uppercase tracking-widest">
                  CASE FILE // #{selectedProject.id}
                </span>
              </div>

              {/* Header Block */}
              <div className="text-left mb-10">
                <div className="font-mono text-[11px] text-[#c8a96e] opacity-60 uppercase tracking-[0.2em] mb-4">
                  {selectedProject.cat} // {selectedProject.status}
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <h1 className="text-[2.2rem] text-[#f0ead8] font-serif font-bold tracking-tight uppercase leading-none">
                    {selectedProject.title}
                  </h1>
                  <span className="font-mono text-[11px] text-[#c8a96e] opacity-60 uppercase">
                    EST. {selectedProject.year}
                  </span>
                </div>
                <div className="border-b border-[rgba(200,169,110,0.25)] w-full"></div>
              </div>

              {/* Project Image Area */}
              <div className="project-bracket w-full h-[280px] bg-[rgba(200,169,110,0.04)] border border-[rgba(200,169,110,0.15)] mb-12 flex items-center justify-center relative overflow-hidden">
                {selectedProject.img ? (
                  <>
                    <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-[#c8a96e] mix-blend-overlay opacity-20"></div>
                  </>
                ) : (
                  <span className="font-mono text-[11px] text-[#c8a96e] opacity-30 uppercase tracking-widest">
                    [ VISUAL DOCUMENTATION PENDING ]
                  </span>
                )}
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 sm:gap-y-6 gap-x-12 mb-10 sm:mb-12 border-b border-[rgba(200,169,110,0.15)] pb-10 sm:pb-12 px-2 sm:px-0">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c8a96e] opacity-60 uppercase">PROJECT_ID:</span>
                    <span className="font-mono text-[11px] sm:text-[12px] text-[#f0ead8] opacity-85 uppercase">#{selectedProject.id}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c8a96e] opacity-60 uppercase">STATUS:</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedProject.status === 'Ongoing' ? 'bg-[#c8a96e] animate-pulse' : 'bg-green-500/80'}`}></div>
                      <span className="font-mono text-[11px] sm:text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.status}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c8a96e] opacity-60 uppercase">CATEGORY:</span>
                    <span className="font-mono text-[11px] sm:text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.cat}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c8a96e] opacity-60 uppercase">INITIATED:</span>
                    <span className="font-mono text-[11px] sm:text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.year}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c8a96e] opacity-60 uppercase">COLLABORATORS:</span>
                    <span className="font-mono text-[11px] sm:text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.collab}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#c8a96e] opacity-60 uppercase shrink-0">STACK:</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="border border-[rgba(200,169,110,0.3)] text-[#c8a96e] bg-transparent font-mono text-[9px] sm:text-[10px] px-[8px] py-[2px] uppercase tracking-tighter">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Block */}
              <div className="mb-12 sm:mb-16 text-left px-2 sm:px-0">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#c8a96e] uppercase tracking-widest mb-6">MISSION BRIEF //</div>
                <div className="border-l-2 border-[rgba(200,169,110,0.3)] pl-[16px] sm:pl-[20px]">
                  <p className="font-mono text-[12px] sm:text-[13px] leading-[1.8] sm:leading-[1.9] text-[rgba(240,234,216,0.8)] text-justify">
                    {selectedProject.fullDesc}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 justify-start px-2 sm:px-0">
                <a 
                  href={selectedProject.live} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-[rgba(200,169,110,0.4)] bg-transparent text-[#c8a96e] font-mono text-[10px] sm:text-[11px] tracking-[0.15em] px-[24px] py-[12px] sm:py-[10px] uppercase hover:bg-[rgba(200,169,110,0.08)] hover:border-[#c8a96e] transition-all text-center"
                >
                  [VIEW LIVE DEPLOYMENT →]
                </a>
                <a 
                  href={selectedProject.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-[rgba(200,169,110,0.4)] bg-transparent text-[#c8a96e] font-mono text-[10px] sm:text-[11px] tracking-[0.15em] px-[24px] py-[12px] sm:py-[10px] uppercase hover:bg-[rgba(200,169,110,0.08)] hover:border-[#c8a96e] transition-all text-center"
                >
                  [INSPECT SOURCE CODE ↗]
                </a>
              </div>

              {/* Navigation Footer */}
              <div className="pt-6 mb-[80px] border-t border-[rgba(200,169,110,0.15)] flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 px-2 sm:px-0">
                {selectedProjectIndex > 0 ? (
                  <button 
                    onClick={() => setSelectedProjectId(projects[selectedProjectIndex - 1].id)}
                    className="w-full sm:w-auto font-mono text-[10px] sm:text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter sm:text-left"
                  >
                    &larr; PREVIOUS CASE FILE
                  </button>
                ) : <div className="hidden sm:block"></div>}
                
                {selectedProjectIndex < projects.length - 1 ? (
                  <button 
                    onClick={() => setSelectedProjectId(projects[selectedProjectIndex + 1].id)}
                    className="w-full sm:w-auto font-mono text-[10px] sm:text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter sm:text-right"
                  >
                    NEXT CASE FILE →
                  </button>
                ) : <div className="hidden sm:block"></div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
