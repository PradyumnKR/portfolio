import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusIndicator from '../components/StatusIndicator';

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All_Files');

  const projects = [
    { 
      id: 'ARCH-001', 
      title: 'Chronos Interface', 
      desc: 'A temporal data visualization dashboard for tracking high-frequency network anomalies across distributed systems.', 
      fullDesc: 'Deployment authorized to monitor asymmetric data spikes across internal routing nodes. The interface prioritizes rapid visual parsing of chronological distortions over raw numerical output. Built to withstand sudden influxes of corrupted packets without crashing the visualization loop.',
      cat: 'Engineering', 
      status: 'Deployed', 
      access: 'Public_Repo',
      year: '2023',
      collab: 'Solo Operation',
      tech: ['React', 'D3.js', 'Node.js', 'WebGL'],
      github: '#',
      live: '#',
      img: null
    },
    { 
      id: 'ARCH-002', 
      title: 'Linguistic Mapping', 
      desc: 'Deep learning study into the etymological roots of technical jargon in post-industrial documentation.', 
      fullDesc: 'An algorithmic dissection of legacy technical manuals recovered from archival servers. The model maps the semantic degradation of engineering terms over three decades, identifying isolated pockets of forgotten terminology. Current findings suggest a convergence towards hyper-optimized, dehumanized syntax.',
      cat: 'Research', 
      status: 'Ongoing', 
      access: 'Restricted',
      year: '2023',
      collab: 'Solo Operation',
      tech: ['Python', 'TensorFlow', 'NLTK', 'PostgreSQL'],
      github: '#',
      live: '#',
      img: null
    },
    { 
      id: 'ARCH-003', 
      title: 'Aether Typography', 
      desc: 'Variable font design exploring legibility in low-light digital environments and atmospheric UI overlays.', 
      fullDesc: 'Experimental typefaces engineered specifically for terminal interfaces operating under minimal power conditions. The glyphs utilize varying stroke contrast to remain legible even when subjected to heavy CRT scanline distortion and sub-pixel color bleeding. A study in necessary brutalism.',
      cat: 'Design', 
      status: 'Archived', 
      access: 'Open_Source',
      year: '2023',
      collab: 'Solo Operation',
      tech: ['GlyphsApp', 'Python', 'CSS3', 'OpenType.js'],
      github: '#',
      live: '#',
      img: null
    },
    { 
      id: 'ARCH-004', 
      title: 'Neural Synthesis', 
      desc: 'Procedural generation of architectural layouts using genetic algorithms and historical floorplan datasets.', 
      fullDesc: 'A generative system tasked with synthesizing highly defensible floorplans based on historical bunker designs. Iterations are evaluated on structural integrity and line-of-sight optimization. The output occasionally produces non-euclidean anomalies that require manual suppression.',
      cat: 'Engineering', 
      status: 'Completed', 
      access: 'Internal',
      year: '2023',
      collab: 'Solo Operation',
      tech: ['C++', 'OpenGL', 'Python', 'Docker'],
      github: '#',
      live: '#',
      img: null
    },
    { 
      id: 'ARCH-005', 
      title: 'Dark Curriculum', 
      desc: 'A curriculum framework for self-taught computational design students focusing on dark-mode aesthetics.', 
      fullDesc: 'A structured pathway for initiating new operatives into the principles of high-contrast, low-latency interface design. Emphasizes the psychological impact of negative space and the necessity of rejecting bloated, modern web frameworks in favor of absolute structural control.',
      cat: 'Design', 
      status: 'Completed', 
      access: 'Public',
      year: '2023',
      collab: 'Solo Operation',
      tech: ['Markdown', 'Next.js', 'TailwindCSS', 'Figma'],
      github: '#',
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
              <div className="mb-12 border-l-4 border-gold pl-6 py-2 text-left">
                <h1 className="text-parchment text-5xl font-bold leading-tight tracking-tighter mb-4 uppercase">Project Compendium</h1>
                <p className="text-gold/70 text-lg max-w-2xl font-light italic">
                  A rigorous classification of digital artifacts, architectural experiments, and investigative research conducted between 2020—2024.
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-4 mb-10 border-b border-gold/10 pb-8 relative z-10">
                <button 
                  onClick={() => setActiveFilter('All_Files')}
                  className={`flex h-10 items-center justify-center gap-x-2 rounded px-5 font-bold text-xs uppercase tracking-widest transition-all ${activeFilter === 'All_Files' ? 'bg-gold text-espresso' : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}>
                  [00] All_Files
                </button>
                {['Design', 'Engineering', 'Research'].map((cat, i) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveFilter(cat)}
                    className={`flex h-10 items-center justify-center gap-x-2 rounded px-5 font-bold text-xs uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-gold text-espresso' : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-12 border-b border-[rgba(200,169,110,0.15)] pb-12">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[10px] text-[#c8a96e] opacity-60 uppercase">PROJECT_ID:</span>
                    <span className="font-mono text-[12px] text-[#f0ead8] opacity-85 uppercase">#{selectedProject.id}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[10px] text-[#c8a96e] opacity-60 uppercase">STATUS:</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedProject.status === 'Ongoing' ? 'bg-[#c8a96e] animate-pulse' : 'bg-green-500/80'}`}></div>
                      <span className="font-mono text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.status}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[10px] text-[#c8a96e] opacity-60 uppercase">CATEGORY:</span>
                    <span className="font-mono text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.cat}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[10px] text-[#c8a96e] opacity-60 uppercase">INITIATED:</span>
                    <span className="font-mono text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.year}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[10px] text-[#c8a96e] opacity-60 uppercase">COLLABORATORS:</span>
                    <span className="font-mono text-[12px] text-[#f0ead8] opacity-85 uppercase">{selectedProject.collab}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[rgba(200,169,110,0.05)] pb-2">
                    <span className="font-mono text-[10px] text-[#c8a96e] opacity-60 uppercase">STACK:</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="border border-[rgba(200,169,110,0.3)] text-[#c8a96e] bg-transparent font-mono text-[10px] px-[8px] py-[2px] uppercase tracking-tighter">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Block */}
              <div className="mb-16 text-left">
                <div className="font-mono text-[10px] text-[#c8a96e] uppercase tracking-widest mb-6">MISSION BRIEF //</div>
                <div className="border-l-2 border-[rgba(200,169,110,0.3)] pl-[20px]">
                  <p className="font-mono text-[13px] leading-[1.9] text-[rgba(240,234,216,0.8)] text-justify">
                    {selectedProject.fullDesc}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-6 mb-12 justify-start">
                <a href={selectedProject.live} className="border border-[rgba(200,169,110,0.4)] bg-transparent text-[#c8a96e] font-mono text-[11px] tracking-[0.15em] px-[24px] py-[10px] uppercase hover:bg-[rgba(200,169,110,0.08)] hover:border-[#c8a96e] transition-all">
                  [VIEW LIVE DEPLOYMENT →]
                </a>
                <a href={selectedProject.github} className="border border-[rgba(200,169,110,0.4)] bg-transparent text-[#c8a96e] font-mono text-[11px] tracking-[0.15em] px-[24px] py-[10px] uppercase hover:bg-[rgba(200,169,110,0.08)] hover:border-[#c8a96e] transition-all">
                  [INSPECT SOURCE CODE ↗]
                </a>
              </div>

              {/* Navigation Footer */}
              <div className="pt-6 mb-[80px] border-t border-[rgba(200,169,110,0.15)] flex justify-between items-center">
                {selectedProjectIndex > 0 ? (
                  <button 
                    onClick={() => setSelectedProjectId(projects[selectedProjectIndex - 1].id)}
                    className="font-mono text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter"
                  >
                    ← PREVIOUS CASE FILE
                  </button>
                ) : <div></div>}
                
                {selectedProjectIndex < projects.length - 1 ? (
                  <button 
                    onClick={() => setSelectedProjectId(projects[selectedProjectIndex + 1].id)}
                    className="font-mono text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter"
                  >
                    NEXT CASE FILE →
                  </button>
                ) : <div></div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
