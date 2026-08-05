import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PROJECT_DATA = {
  'ARCH-001': {
    title: 'Chronos Interface',
    status: 'DECLASSIFIED',
    clearance: 'LEVEL 4',
    date: 'OCT 2023',
    github: 'https://github.com/username/chronos-interface',
    deployed: 'https://username.github.io/chronos-interface',
    problem: 'The existing temporal data systems were suffering from 14ms latency spikes, causing significant desynchronization in real-time network anomaly tracking across 500+ nodes.',
    investigation: 'Initial packet trace revealed a bottleneck in the WebSocket handshake protocol. Further analysis using custom telemetry identified a race condition in the state management layer of the central dashboard.',
    solution: 'Implemented a localized state-sharding architecture combined with a priority-queue buffer for high-frequency updates. Migrated the core processing logic to a Rust-based WASM module for near-native performance.',
    outcome: 'Latency spikes reduced to <1ms. System throughput increased by 400%, allowing for 2,000+ concurrent node tracking with perfect synchronization.'
  },
  'ARCH-002': {
    title: 'Linguistic Mapping',
    status: 'RESTRICTED',
    clearance: 'LEVEL 3',
    date: 'AUG 2023',
    github: 'https://github.com/username/linguistic-mapping',
    deployed: 'https://username.github.io/linguistic-mapping',
    problem: 'Technical jargon in post-industrial documentation was evolving faster than human archivists could catalog, leading to a 30% error rate in cross-reference retrieval.',
    investigation: 'Conducted a deep etymological study across 50,000+ internal manuscripts. Discovered that 60% of new jargon originated from misinterpreted machine-generated error logs.',
    solution: 'Developed a BERT-based NLP model trained on historical technical archives. Created a dynamic mapping interface that visualizes the evolution of terms over a 40-year period.',
    outcome: 'Cataloging error rate dropped to <2%. Archivists now use the tool for automated semantic tagging of all incoming dispatches.'
  },
  'ARCH-003': {
    title: 'Aether Typography',
    status: 'DECLASSIFIED',
    clearance: 'LEVEL 2',
    date: 'JUN 2023',
    github: 'https://github.com/username/aether-typography',
    deployed: 'https://username.github.io/aether-typography',
    problem: 'Standard digital typefaces fail to maintain legibility in the high-contrast, low-light environments typical of tactical HUDs and deep-sea exploration vessels.',
    investigation: 'Tested 200+ variable font axes against various atmospheric noise filters. Identified that vertical stroke thickness and exaggerated apertures significantly improved recognition speed.',
    solution: 'Engineered a custom variable font with responsive optical sizing. Implemented a real-time weight-adjustment algorithm that compensates for screen glare and ambient light levels.',
    outcome: 'Reading comprehension speed in low-visibility simulations improved by 35%. The font is now the standard for all "Aether" class naval interfaces.'
  },
  'ARCH-004': {
    title: 'Neural Synthesis',
    status: 'INTERNAL',
    clearance: 'LEVEL 5',
    date: 'APR 2023',
    github: 'https://github.com/username/neural-synthesis',
    deployed: 'https://username.github.io/neural-synthesis',
    problem: 'Designing complex architectural floorplans that satisfy both historical aesthetic constraints and modern safety regulations is a process that takes months of manual iteration.',
    investigation: 'Analyzed 10,000+ historical blueprints from the mid-19th century. Built a dataset of "aesthetic markers" that define the period-specific architectural language.',
    solution: 'Created a Generative Adversarial Network (GAN) combined with a constraint-based solver. The system generates 100+ compliant layouts in seconds, filtered by aesthetic "purity" scores.',
    outcome: 'Initial design phase reduced from 12 weeks to 48 hours. Architects can now focus on high-level spatial curation rather than manual compliance checking.'
  },
  'ARCH-005': {
    title: 'Sentinel Ops',
    status: 'DECLASSIFIED',
    clearance: 'LEVEL 4',
    date: 'JUN 2026',
    github: 'https://github.com/PradyumnKR/sentinel-ops',
    deployed: 'https://sentinel-ops-pied.vercel.app',
    problem: 'High-velocity DevOps and security environments suffer from operator eye strain during long triage sessions, lack auditable and locked histories for resolved incidents, and struggle with slow manual runbook generation.',
    investigation: 'Analyzed incident command setups and security dashboard ergonomics. Identified key bottlenecks in incident transition state validity and slow cognitive retrieval of security runbooks.',
    solution: 'Engineered the Obsidian Command dark-theme console using CSS Variables and glassmorphic containers. Enforced state-machine transitions and automatically locked incidents post-resolution. Integrated Llama 3.3 via Groq for automated runbook generation, severity syncing, and threat analysis, and built a searchable audit logging engine.',
    outcome: 'Reduced incident triage reaction times and eye strain. State transitions are strictly enforced, and AI-powered assessments generate recovery runbooks in real time. Live deployment hosted on Vercel.'
  },
  'ARCH-006': {
    title: 'Ledgerly',
    status: 'DECLASSIFIED',
    clearance: 'LEVEL 3',
    date: 'AUG 2026',
    github: 'https://github.com/PradyumnKR/ledgerly',
    deployed: 'https://ledgerly-one-opal.vercel.app/login',
    problem: 'Conventional financial applications treat transactions as mutable CRUD operations, risking audit failures, database floating-point calculation drift, and race conditions during concurrent balance updates.',
    investigation: 'Analyzed standard floating-point handling, which introduced rounding discrepancies. Examined concurrent write behaviors under heavy traffic, revealing that parallel requests led to lost updates and duplicate writes.',
    solution: 'Enforced absolute immutability by designing an append-only ledger where corrections require compensating reversal entries. Implemented minor-unit integer storage to prevent floating-point drift, row locking (SELECT FOR UPDATE) to serialize writes, and an Idempotency-Key header to block duplicate submissions. Integrated Llama 3.3 for natural-language entry.',
    outcome: 'Achieved 100% precision in financial records with zero float drift. Balance updates remained concurrency-safe under 20 simultaneous writes, with write idempotency preventing duplicate transaction charges.'
  }
};

const RedactedText = ({ text }) => {
  return (
    <motion.span 
      className="relative cursor-help group"
      whileHover="reveal"
    >
      <motion.span 
        variants={{
          reveal: { opacity: 1, filter: 'blur(0px)' }
        }}
        initial={{ opacity: 0.2, filter: 'blur(4px)' }}
        className="text-parchment transition-all duration-300"
      >
        {text}
      </motion.span>
      <motion.span 
        variants={{
          reveal: { scaleX: 0 }
        }}
        className="absolute inset-0 bg-gold/80 origin-left"
      />
    </motion.span>
  );
};

export default function CaseStudy() {
  const { id } = useParams();
  const project = PROJECT_DATA[id] || PROJECT_DATA['ARCH-001'];

  return (
    <div className="bg-espresso parchment-grain min-h-screen py-24 px-6 relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-wax-red opacity-10"></div>
      
      <main className="max-w-4xl mx-auto bg-gold/5 border border-gold/10 p-12 relative overflow-hidden">
        {/* Header Stamps */}
        <div className="absolute top-8 right-8 flex flex-col gap-2 items-end">
          <div className="border-2 border-wax-red px-4 py-1 text-wax-red text-xs font-bold rotate-[-5deg] uppercase tracking-widest opacity-60">
            {project.status}
          </div>
          <div className="text-[10px] text-gold/40 font-mono">CASE_FILE: {id}</div>
          <div className="text-[10px] text-gold/40 font-mono">CLEARANCE: {project.clearance}</div>
        </div>

        <Link to="/projects" className="text-gold/60 hover:text-gold text-[10px] uppercase tracking-widest flex items-center gap-2 mb-16 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Return to Archive
        </Link>

        {/* File Content */}
        <div className="space-y-16 text-left">
          <div className="border-b border-gold/10 pb-8">
            <span className="text-[10px] text-gold/60 uppercase tracking-[0.5em] block mb-4">Dossier / Project_Subject</span>
            <h1 className="text-5xl font-bold text-parchment tracking-tighter uppercase">{project.title}</h1>
            <p className="text-gold/40 font-mono text-xs mt-4">DATE_STAMP: {project.date}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-gold uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="w-8 h-px bg-gold/30"></span>
              01. The Problem
            </h2>
            <p className="text-lg leading-relaxed text-parchment/80 font-serif italic pl-12 border-l border-gold/10">
              <RedactedText text={project.problem} />
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-gold uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="w-8 h-px bg-gold/30"></span>
              ACCESS_PROTOCOLS
            </h2>
            <div className="pl-12 flex gap-8">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors"
              >
                <span className="material-symbols-outlined text-sm">terminal</span>
                Github_Repo
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a 
                href={project.deployed} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-gold/60 hover:text-gold transition-colors"
              >
                <span className="material-symbols-outlined text-sm">language</span>
                Live_Artifact
                <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-gold uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="w-8 h-px bg-gold/30"></span>
              02. Investigation
            </h2>
            <p className="text-base leading-loose text-ink-dim pl-12 text-justify">
              {project.investigation}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-gold uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="w-8 h-px bg-gold/30"></span>
              03. The Solution
            </h2>
            <p className="text-base leading-loose text-ink-dim pl-12 text-justify bg-gold/[0.02] py-8 border-y border-gold/5">
              {project.solution}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-bold text-gold uppercase tracking-[0.3em] flex items-center gap-4">
              <span className="w-8 h-px bg-gold/30"></span>
              04. Outcome
            </h2>
            <div className="pl-12">
              <div className="bg-wax-red/10 border border-wax-red/20 p-6 relative">
                <div className="absolute -top-3 -right-3 size-12 opacity-10">
                  <span className="material-symbols-outlined text-5xl text-wax-red">verified</span>
                </div>
                <p className="text-parchment/90 font-mono text-sm leading-relaxed">
                  <RedactedText text={project.outcome} />
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Marking */}
        <div className="mt-24 pt-8 border-t border-gold/10 flex justify-between items-center opacity-30">
          <span className="text-[8px] uppercase tracking-widest text-gold">Property of NOCTURNE STUDIES</span>
          <div className="flex gap-4">
            <span className="text-[8px] font-mono">FILE_VER: 9.2</span>
            <span className="text-[8px] font-mono">CHECKSUM: 0x82F...</span>
          </div>
        </div>
      </main>
    </div>
  );
}
