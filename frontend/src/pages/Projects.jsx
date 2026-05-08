import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatusIndicator from '../components/StatusIndicator';

export default function Projects() {
  const projects = [
    { id: 'ARCH-001', title: 'Chronos Interface', desc: 'A temporal data visualization dashboard for tracking high-frequency network anomalies across distributed systems.', cat: 'Engineering', status: 'Deployed', access: 'Public_Repo' },
    { id: 'ARCH-002', title: 'Linguistic Mapping', desc: 'Deep learning study into the etymological roots of technical jargon in post-industrial documentation.', cat: 'Research', status: 'Ongoing', access: 'Restricted' },
    { id: 'ARCH-003', title: 'Aether Typography', desc: 'Variable font design exploring legibility in low-light digital environments and atmospheric UI overlays.', cat: 'Design', status: 'Archived', access: 'Open_Source' },
    { id: 'ARCH-004', title: 'Neural Synthesis', desc: 'Procedural generation of architectural layouts using genetic algorithms and historical floorplan datasets.', cat: 'Engineering', status: 'Completed', access: 'Internal' },
    { id: 'ARCH-005', title: 'Syllabus Design', desc: 'A curriculum framework for self-taught computational design students focusing on dark-mode aesthetics.', cat: 'Design', status: 'Completed', access: 'Public' },
  ];

  const getStatusState = (status) => {
    if (status === 'Deployed' || status === 'Completed') return 'online';
    if (status === 'Ongoing') return 'standby';
    return 'offline';
  };

  return (
    <div className="bg-espresso parchment-grain min-h-screen py-24">
      <main className="max-w-[1400px] mx-auto w-full px-6 lg:px-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 border-l-4 border-gold pl-6 py-2 text-left"
        >
          <h1 className="text-parchment text-5xl font-bold leading-tight tracking-tighter mb-4 uppercase">Project Compendium</h1>
          <p className="text-gold/70 text-lg max-w-2xl font-light italic">
            A rigorous classification of digital artifacts, architectural experiments, and investigative research conducted between 2020—2024.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-10 border-b border-gold/10 pb-8">
          <button className="flex h-10 items-center justify-center gap-x-2 rounded px-5 bg-gold text-espresso font-bold text-xs uppercase tracking-widest">
            [00] All_Files
          </button>
          {['Design', 'Engineering', 'Research'].map((cat, i) => (
            <button key={cat} className="flex h-10 items-center justify-center gap-x-2 rounded px-5 bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 font-medium text-xs uppercase tracking-widest transition-all">
              [0{i+1}] {cat}
            </button>
          ))}
        </div>

        {/* Grid of Catalog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Link 
              key={project.id}
              to={`/projects/${project.id}`}
              className="group"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gold/5 border border-gold/10 p-6 rounded relative overflow-hidden flex flex-col gold-edge text-left hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)] transition-all h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-gold/20 text-gold text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest group-hover:bg-gold group-hover:text-espresso transition-colors">Ref. #{project.id}</div>
                  <div className="text-gold/40 text-[10px] font-bold">EST. 2023</div>
                </div>
                <h3 className="text-parchment text-xl font-bold mb-2 uppercase tracking-tight group-hover:text-gold transition-colors">{project.title}</h3>
                <p className="text-ink-dim text-sm mb-6 leading-relaxed flex-grow">{project.desc}</p>
                <div className="border-t border-gold/10 pt-4 flex flex-col gap-3">
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
                  <div className="flex justify-between text-[11px] uppercase tracking-wider">
                    <span className="text-gold/50">Access</span>
                    <span className="text-parchment/80 uppercase">View Dossier</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          
          <div className="bg-transparent border-2 border-dashed border-gold/20 p-6 rounded relative overflow-hidden flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity group cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-gold mb-2 group-hover:scale-110 transition-transform">add_notes</span>
            <p className="text-gold text-xs font-bold uppercase tracking-widest">New_Classification</p>
          </div>
        </div>

        {/* Tabular Index (Footer View) */}
        <div className="mt-20 border-t border-gold/20 pt-10 text-left">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-parchment text-xl font-bold uppercase">Tabular Index</h2>
            <button className="text-gold text-xs font-bold uppercase tracking-widest border-b border-gold/40 pb-1">Export PDF</button>
          </div>
          <div className="overflow-x-auto rounded border border-gold/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gold/5 border-b border-gold/20">
                  <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Index_ID</th>
                  <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Project_Title</th>
                  <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Classification</th>
                  <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">Year</th>
                  <th className="px-6 py-4 text-[10px] text-gold font-bold uppercase tracking-widest">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {projects.slice(0, 3).map((p) => (
                  <tr key={p.id} className="hover:bg-gold/5 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 text-xs font-mono text-gold/60">#{p.id.split('-')[1]}</td>
                    <td className="px-6 py-4 text-xs font-bold text-parchment/80 group-hover:text-gold">{p.title}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] bg-gold/10 px-2 py-0.5 rounded text-gold">{p.cat.toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-ink-dim">2023</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'Ongoing' ? 'bg-gold animate-pulse' : 'bg-green-500'}`}></div>
                        <span className="text-[10px] text-parchment/60 uppercase font-medium">{p.status === 'Ongoing' ? 'Active' : 'Complete'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
