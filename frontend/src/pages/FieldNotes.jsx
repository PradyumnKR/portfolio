import { motion } from 'framer-motion';

const ENTRIES = [
  {
    id: 1,
    date: '04 MAY 2026',
    title: 'The Ghost in the Machine',
    excerpt: 'Observations on the emergent behavior of large language models when prompted with recursive logic gates...',
    tags: ['AI', 'Research', 'Philosophy'],
    content: 'ENTRY_LOG_START: I have spent the last three nights observing the "latent space" shadows. There is a specific point in the recursion where the model ceases to provide answers and begins to ask questions about the prompt\'s own existence. Is it a glitch, or a reflection of the architecture\'s own self-consistency check? I suspect the latter.'
  },
  {
    id: 2,
    date: '28 APR 2026',
    title: 'Parchment and Pixels',
    excerpt: 'Bridging the tactile divide: how to simulate the weight of physical paper in high-latency digital environments...',
    tags: ['Design', 'UX', 'Frontend'],
    content: 'MEMO: The current trend of "flat" design is a betrayal of the human experience. Humans crave texture, weight, and history. By utilizing variable opacity noise filters and simulated "grain," we can restore the dignity of the medium. The user should feel as if they are turning a page, not sliding a glass pane.'
  },
  {
    id: 3,
    date: '15 APR 2026',
    title: 'The Chromium Bottleneck',
    excerpt: 'An investigation into the memory leaks occurring during heavy SVG transformation cycles in modern browsers...',
    tags: ['Engineering', 'Optimization'],
    content: 'INCIDENT_REPORT: Case #884. During the implementation of the animated quill, memory usage spiked by 400MB over a 10-minute session. Root cause identified: improper cleanup of Framer Motion layout IDs in high-frequency render loops. Resolved via requestAnimationFrame synchronization.'
  }
];

const Memo = ({ entry, index }) => (
  <motion.article 
    initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1 : 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="bg-parchment text-espresso p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:rotate-0 transition-transform duration-500"
    style={{ fontFamily: 'serif' }}
  >
    {/* Paper Texture Overlay */}
    <div className="absolute inset-0 opacity-10 grain pointer-events-none"></div>
    
    {/* Header */}
    <div className="flex justify-between items-start mb-8 border-b border-espresso/20 pb-4">
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">INTERNAL_MEMO</span>
        <h2 className="text-2xl font-bold tracking-tight uppercase leading-none">{entry.title}</h2>
      </div>
      <div className="text-right">
        <span className="text-[10px] font-mono font-bold">{entry.date}</span>
      </div>
    </div>

    {/* Content */}
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-espresso/80 text-justify">
        {entry.content}
      </p>
      
      <div className="flex flex-wrap gap-2 pt-4">
        {entry.tags.map(tag => (
          <span key={tag} className="text-[9px] border border-espresso/20 px-2 py-0.5 uppercase tracking-tighter">
            #{tag}
          </span>
        ))}
      </div>
    </div>

    {/* Footer Markings */}
    <div className="absolute bottom-4 right-8 opacity-20 rotate-[-15deg] pointer-events-none">
      <div className="border-2 border-wax-red px-3 py-1 text-wax-red text-[10px] font-bold uppercase">
        ARCHIVED
      </div>
    </div>
  </motion.article>
);

export default function FieldNotes() {
  return (
    <div className="bg-[#2a2218] min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Wooden Desk Effect Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }}></div>
      
      <main className="max-w-4xl mx-auto relative z-10">
        <header className="mb-20 text-left border-l-4 border-gold pl-8">
          <span className="text-gold/60 text-[10px] uppercase tracking-[0.5em] block mb-2">The Chronicle // Logbook</span>
          <h1 className="text-5xl font-light text-parchment tracking-tighter uppercase">Field Notes</h1>
          <p className="text-ink-dim italic text-sm mt-4">Manual observations and technical dispatches from the front lines of digital architecture.</p>
        </header>

        <div className="space-y-12">
          {ENTRIES.map((entry, i) => (
            <Memo key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Load More Trigger */}
        <div className="mt-20 flex justify-center">
          <button className="text-gold/40 hover:text-gold text-[10px] uppercase tracking-[0.4em] border-b border-gold/10 pb-1 transition-colors">
            Seek Older Records_
          </button>
        </div>
      </main>
    </div>
  );
}
