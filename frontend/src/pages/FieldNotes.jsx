import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENTRIES = [
  {
    id: 1,
    date: '04 MAY 2026',
    title: 'The Ghost in the Machine',
    excerpt: 'Observations on the emergent behavior of large language models when prompted with recursive logic gates...',
    tags: ['AI', 'Research', 'Philosophy'],
    content: 'ENTRY_LOG_START: I have spent the last three nights observing the "latent space" shadows. There is a specific point in the recursion where the model ceases to provide answers and begins to ask questions about the prompt\'s own existence. Is it a glitch, or a reflection of the architecture\'s own self-consistency check? I suspect the latter.\n\n* * *\n\nFurther tests will be conducted tomorrow. The system remains offline until I can isolate the recursive loop.'
  },
  {
    id: 2,
    date: '28 APR 2026',
    title: 'Parchment and Pixels',
    excerpt: 'Bridging the tactile divide: how to simulate the weight of physical paper in high-latency digital environments...',
    tags: ['Design', 'UX', 'Frontend'],
    content: 'MEMO: The current trend of "flat" design is a betrayal of the human experience. Humans crave texture, weight, and history. By utilizing variable opacity noise filters and simulated "grain," we can restore the dignity of the medium. The user should feel as if they are turning a page, not sliding a glass pane.\n\n* * *\n\nThe juxtaposition of CRT scanlines against ancient paper textures creates a unique temporal dissonance. It grounds the user in both the past and the future.'
  },
  {
    id: 3,
    date: '15 APR 2026',
    title: 'The Chromium Bottleneck',
    excerpt: 'An investigation into the memory leaks occurring during heavy SVG transformation cycles in modern browsers...',
    tags: ['Engineering', 'Optimization'],
    content: 'INCIDENT_REPORT: Case #884. During the implementation of the animated quill, memory usage spiked by 400MB over a 10-minute session. Root cause identified: improper cleanup of Framer Motion layout IDs in high-frequency render loops. Resolved via requestAnimationFrame synchronization.\n\nAdditional tracing shows minor reflows in the canvas shadow layer. Will patch in build v1.2.4.'
  },
  {
    id: 4,
    date: '10 APR 2026',
    title: 'Echoes of the Mainframe',
    excerpt: 'Rediscovering the elegance of procedural generation from the perspective of archaic terminal systems...',
    tags: ['Systems', 'History', 'Engineering'],
    content: 'ENTRY_LOG_START: The raw efficiency of 1980s terminal procedural generation holds lessons we have largely forgotten. When rendering an entire universe in 64kb, constraints breed true innovation. Today, we waste megabytes on empty space.\n\n* * *\n\nI have successfully ported a variant of the Elite trading algorithm into our modern state engine. It runs in microseconds.'
  },
  {
    id: 5,
    date: '02 APR 2026',
    title: 'Silent Telemetry',
    excerpt: 'A structural approach to monitoring application health without violating the privacy of the end user...',
    tags: ['Security', 'Architecture'],
    content: 'MEMO: Telemetry need not be a surveillance tool. By aggregating purely structural event logs—detached from user session IDs—we can maintain a perfect understanding of application stability while ensuring zero knowledge of user behavior.\n\nIt is the mathematical equivalent of feeling the pulse without asking the patient\'s name.'
  },
  {
    id: 6,
    date: '24 MAR 2026',
    title: 'The Aesthetics of Decay',
    excerpt: 'Why pristine interfaces fail to engage, and how introducing controlled entropy creates lasting emotional resonance...',
    tags: ['Design', 'Philosophy'],
    content: 'INCIDENT_REPORT: Initial beta testing of the v3.0 interface showed a 40% drop in user retention. The UI was perfectly clean, mathematically aligned, and completely dead.\n\n* * *\n\nSolution: We introduced algorithmic "decay" into the borders and typography. Slight misalignments, noise overlays, and flicker. Engagement rebounded immediately. Humans do not trust perfection.'
  },
  {
    id: 7,
    date: '11 MAR 2026',
    title: 'Quantum State Management',
    excerpt: 'Handling asynchronous UI conflicts in distributed systems by embracing probabilistic rendering...',
    tags: ['Frontend', 'Engineering', 'AI'],
    content: 'ENTRY_LOG_START: If two users edit the same node simultaneously, classic CRDTs merge the state. But what if the UI simply rendered the probability of both states until the server resolved the collapse? A shimmering, indeterminate UI element accurately reflects the reality of the network.\n\nI will test this hypothesis next week on the primary dashboard.'
  }
];

const Memo = ({ entry, index, onClick }) => (
  <motion.article 
    initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1 : 1 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    onClick={() => onClick(entry.id)}
    className="relative px-[32px] py-[28px] shadow-2xl group transition-all duration-300 cursor-pointer rounded-none border border-[rgba(200,169,110,0.15)] border-t-[rgba(200,169,110,0.4)] hover:border-t-[rgba(200,169,110,0.8)] hover:shadow-[0_0_20px_rgba(200,169,110,0.06)] overflow-hidden"
    style={{ 
      backgroundColor: '#1a1712',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
      backgroundSize: '200px 200px',
      backgroundBlendMode: 'overlay'
    }}
  >
    {/* Header */}
    <div className="flex justify-between items-start mb-4 border-b border-[rgba(200,169,110,0.25)] pb-4">
      <div className="space-y-1">
        <span className="text-[#c8a96e] opacity-60 font-mono text-[10px] uppercase tracking-widest font-bold">INTERNAL_MEMO</span>
        <h2 className="text-[#f0ead8] font-serif text-2xl font-bold tracking-tight uppercase leading-none">{entry.title}</h2>
      </div>
      <div className="text-right">
        <span className="text-[#c8a96e] opacity-70 font-mono text-[10px] font-bold">{entry.date}</span>
      </div>
    </div>

    {/* Content */}
    <div className="space-y-6">
      <p className="font-mono text-[13px] leading-[1.8] text-[rgba(240,234,216,0.75)] text-justify line-clamp-3">
        {entry.excerpt}
      </p>
      
      <div className="flex flex-wrap gap-2 pt-4">
        {entry.tags.map(tag => (
          <span key={tag} className="border border-[rgba(200,169,110,0.3)] text-[#c8a96e] opacity-70 bg-transparent text-[10px] font-mono px-[8px] py-[2px] uppercase tracking-tighter">
            #{tag}
          </span>
        ))}
      </div>
    </div>

    {/* Footer Markings */}
    <div className="absolute bottom-4 right-8 rotate-[-15deg] pointer-events-none">
      <div className="border-2 border-[rgba(200,169,110,0.4)] text-[#c8a96e] opacity-50 font-mono px-3 py-1 text-[10px] font-bold uppercase">
        ARCHIVED
      </div>
    </div>
  </motion.article>
);

export default function FieldNotes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset to page 1 when search or tags change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, activeTags]);

  const allTags = Array.from(new Set(ENTRIES.flatMap(e => e.tags)));

  const handleTagClick = (tag) => {
    if (tag === 'ALL') {
      setActiveTags([]);
    } else {
      setActiveTags(prev => {
        if (prev.includes(tag)) {
          return prev.filter(t => t !== tag);
        } else {
          return [...prev, tag];
        }
      });
    }
  };

  const filteredEntries = ENTRIES.filter(entry => {
    const query = debouncedQuery.toLowerCase();
    const matchesSearch = query === '' || 
                          entry.title.toLowerCase().includes(query) || 
                          entry.content.toLowerCase().includes(query);
    
    const matchesTags = activeTags.length === 0 || activeTags.every(tag => entry.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const totalEntries = filteredEntries.length;
  const totalPages = Math.ceil(totalEntries / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, totalEntries);
  const currentEntries = filteredEntries.slice(startIndex, endIndex);

  const selectedPostIndex = selectedPostId ? ENTRIES.findIndex(e => e.id === selectedPostId) : -1;
  const selectedPost = selectedPostId ? ENTRIES[selectedPostIndex] : null;

  const scrollToTop = () => {
    document.getElementById('post-list-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="journal-page bg-[#1a1710] min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Wooden Desk Effect Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }}></div>
      
      <main className="max-w-4xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <header className="mb-10 text-left border-l-4 border-gold pl-8">
                <span className="text-gold/60 text-[10px] uppercase tracking-[0.5em] block mb-2">The Chronicle // Logbook</span>
                <h1 className="text-5xl font-light text-parchment tracking-tighter uppercase">Field Notes</h1>
                <p className="text-ink-dim italic text-sm mt-4">Manual observations and technical dispatches from the front lines of digital architecture.</p>
              </header>

              {/* Filter Bar */}
              <div className="mb-[40px] flex items-center gap-4 flex-wrap border-b border-[rgba(200,169,110,0.15)] pb-6">
                <div className="flex items-center">
                  <span className="text-[#c8a96e] opacity-50 font-mono text-[12px] mr-2">QUERY //</span>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SEARCH RECORDS..."
                    className="w-[240px] bg-[rgba(200,169,110,0.05)] border border-[rgba(200,169,110,0.2)] rounded-none px-[14px] py-[8px] font-mono text-[12px] text-[#f0ead8] placeholder-[rgba(200,169,110,0.4)] focus:outline-none focus:border-[rgba(200,169,110,0.6)] focus:shadow-[0_0_8px_rgba(200,169,110,0.1)] transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-2 md:ml-auto mt-4 md:mt-0">
                  <button 
                    onClick={() => handleTagClick('ALL')}
                    className={`border font-mono text-[11px] px-[8px] py-[2px] uppercase tracking-tighter transition-colors ${activeTags.length === 0 ? 'bg-[rgba(200,169,110,0.15)] border-[#c8a96e] text-[#c8a96e]' : 'bg-transparent border-[rgba(200,169,110,0.25)] text-[#c8a96e] opacity-70 hover:opacity-100'}`}
                  >
                    ALL
                  </button>
                  {allTags.map(tag => {
                    const isActive = activeTags.includes(tag);
                    return (
                      <button 
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`border font-mono text-[11px] px-[8px] py-[2px] uppercase tracking-tighter transition-colors ${isActive ? 'bg-[rgba(200,169,110,0.15)] border-[#c8a96e] text-[#c8a96e]' : 'bg-transparent border-[rgba(200,169,110,0.25)] text-[#c8a96e] opacity-70 hover:opacity-100'}`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div id="post-list-top" className="scroll-mt-12"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, exit: { duration: 0.2 } }}
                  className="space-y-12"
                >
                  {currentEntries.length > 0 ? (
                    currentEntries.map((entry, i) => (
                      <Memo key={entry.id} entry={entry} index={i} onClick={setSelectedPostId} />
                    ))
                  ) : (
                    <div className="py-12 text-center border border-[rgba(200,169,110,0.1)] bg-[#1a1712]">
                      <p className="text-[#c8a96e] font-mono text-sm uppercase tracking-widest opacity-80">
                        NO RECORDS MATCH THIS QUERY.<br/><span className="opacity-50 mt-2 block">ARCHIVE MAY BE CLASSIFIED.</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Controls */}
              {totalEntries > 0 && (
                <div className="mt-20 flex flex-col items-center gap-6">
                  {/* Page Indicator */}
                  <div className="font-mono text-[10px] text-[#c8a96e] opacity-45 uppercase tracking-widest">
                    DISPLAYING PAGE {currentPage.toString().padStart(2, '0')} // RECORDS {String(startIndex + 1).padStart(2, '0')}-{String(endIndex).padStart(2, '0')}
                  </div>

                  {currentPage < totalPages ? (
                    <button 
                      onClick={() => {
                        setCurrentPage(p => p + 1);
                        scrollToTop();
                      }}
                      className="text-[#c8a96e]/60 hover:text-[#c8a96e] text-[10px] font-mono uppercase tracking-[0.4em] border-b border-[#c8a96e]/20 hover:border-[#c8a96e]/50 pb-1 transition-colors"
                    >
                      Seek Older Records_
                    </button>
                  ) : (
                    <div className="font-mono text-[11px] text-[#c8a96e] opacity-50 uppercase tracking-widest text-center mt-4">
                      ALL RECORDS RETRIEVED. ARCHIVE DEPTH REACHED.
                    </div>
                  )}

                  {/* Return to Recent */}
                  {currentPage > 1 && (
                    <button 
                      onClick={() => {
                        setCurrentPage(1);
                        scrollToTop();
                      }}
                      className="text-[#c8a96e]/40 hover:text-[#c8a96e]/80 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors mt-2"
                    >
                      &larr; RETURN TO RECENT TRANSMISSIONS
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button 
                onClick={() => setSelectedPostId(null)}
                className="mb-6 font-mono text-[11px] text-[#c8a96e] opacity-70 hover:opacity-100 transition-all hover:tracking-wide uppercase tracking-tighter"
              >
                &larr; RETURN TO ARCHIVE
              </button>
              
              <article 
                className="relative px-[56px] py-[48px] border border-[rgba(200,169,110,0.2)] rounded-none overflow-hidden"
                style={{ 
                  backgroundColor: '#1a1712',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
                  backgroundSize: '200px 200px',
                  backgroundBlendMode: 'overlay'
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[#c8a96e] opacity-60 font-mono text-[10px] uppercase tracking-widest font-bold">INTERNAL_MEMO</span>
                  <span className="text-[#c8a96e] opacity-70 font-mono text-[10px] font-bold">{selectedPost.date}</span>
                </div>
                
                <h1 className="text-[2rem] text-[#f0ead8] font-serif font-bold tracking-tight uppercase leading-none mb-6">
                  {selectedPost.title}
                </h1>
                
                <div className="border-b border-[rgba(200,169,110,0.25)] mb-6"></div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="border border-[rgba(200,169,110,0.3)] text-[#c8a96e] opacity-70 bg-transparent text-[10px] font-mono px-[8px] py-[2px] uppercase tracking-tighter">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-12 font-mono text-[10px] text-[#c8a96e] opacity-40 uppercase tracking-widest">
                  CLASSIFICATION: OPEN SOURCE // ENTRY LOG // FIELD DISPATCH
                </div>

                <div className="space-y-[20px] font-mono text-[13px] leading-[1.9] text-[rgba(240,234,216,0.8)] text-justify">
                  {selectedPost.content.split('\n').map((paragraph, idx) => {
                    if (paragraph.trim() === '* * *') {
                      return <div key={idx} className="text-center text-[#c8a96e] opacity-60 my-8">* * *</div>;
                    }
                    if (paragraph.trim() === '') return null;
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>

                <div className="mt-16 text-center font-mono text-[11px] text-[#c8a96e] opacity-35 uppercase tracking-widest">
                  &mdash; END OF TRANSMISSION &mdash;
                </div>

                <div className="mt-20 pt-6 border-t border-[rgba(200,169,110,0.15)] flex justify-between items-center">
                  {selectedPostIndex > 0 ? (
                    <button 
                      onClick={() => setSelectedPostId(ENTRIES[selectedPostIndex - 1].id)}
                      className="font-mono text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter"
                    >
                      &larr; PREVIOUS ENTRY
                    </button>
                  ) : <div></div>}
                  
                  {selectedPostIndex < ENTRIES.length - 1 ? (
                    <button 
                      onClick={() => setSelectedPostId(ENTRIES[selectedPostIndex + 1].id)}
                      className="font-mono text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter"
                    >
                      NEXT ENTRY &rarr;
                    </button>
                  ) : <div></div>}
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
