import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-espresso min-h-screen py-24">
      <main className="flex-1 flex flex-col items-center">
        <div className="max-w-[1000px] w-full px-6 py-12">
          {/* Section I: The Protagonist */}
          <section className="grid md:grid-cols-12 gap-12 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative group"
            >
              <div className="absolute inset-0 border-2 border-gold translate-x-4 translate-y-4 -z-10 opacity-40"></div>
              <div className="grainy-overlay aspect-[3/4] bg-[#1a140e] overflow-hidden border border-gold/20">
                <img 
                  alt="Julian Thorne" 
                  className="w-full h-full object-cover grayscale brightness-75 contrast-125 mix-blend-luminosity" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Y-D-DjLO4IuBXWoGUDsbo6V5wRBOBuBI7g21dfiBSECt7OAsXbBYzf6_cEIIyfV7RpNrNn3fF2UtF8vJfbabQUPOPCb4kNWXGu6eye5oiyARa8aK1vwlPDEBBIJDF_dY__js7PpGaZTVCzzA72x_Qpeuk05lH0qx7CQq0TXTAdN9Dx-_3yOYAl6vuYSwdP2TfboKOPH7cjKgGTG4XImXx1Dlg4oB-E7vQ5ByM96Dtug0WMZdqQNnS0zvkMIOr4d2YkPcAH0CayQ"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 flex flex-col gap-6"
            >
              <div className="space-y-2 text-left">
                <p className="text-gold text-sm tracking-[0.3em] uppercase font-bold">Volume I. The Protagonist</p>
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-parchment">Julian Thorne</h1>
              </div>
              <div className="h-0.5 w-16 bg-gold"></div>
              <div className="space-y-4 text-left">
                <p className="text-lg leading-relaxed text-ink-dim italic">
                  "A multidisciplinary curator of digital artifacts and architectural systems, bridging the gap between the tactile past and the ephemeral future."
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gold/5 border border-gold/10 text-[10px] uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-sm text-gold">history_edu</span> Est. 1994
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gold/5 border border-gold/10 text-[10px] uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-sm text-gold">location_on</span> Oxford, UK
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <div className="book-chapter-divider mb-24"></div>

          {/* Chapter I */}
          <section className="mb-24">
            <div className="max-w-2xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">Chapter I</span>
                <h2 className="text-3xl font-display font-bold text-parchment">The Genesis of Thought</h2>
              </div>
              <div className="space-y-8 text-ink-dim leading-loose text-justify">
                <p className="first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-gold">
                  In the quiet corners of forgotten libraries, among the scent of aged paper and leather bindings, I found my true calling. My journey began not with a screen, but with a manual typewriter—a tool that demanded intentionality in every stroke. This tactile beginning shaped my understanding of design as something permanent and heavy, rather than fleeting.
                </p>
                <p>
                  Over the past decade, I have curated digital experiences that mirror the structured permanence of a well-worn book. I believe that a user's journey through a website should feel like turning pages—each interaction a deliberate movement, each layout a composition of classical balance and modern utility.
                </p>
              </div>
            </div>
          </section>

          {/* Section II: Architectural Philosophy */}
          <section className="bg-gold/5 p-8 md:p-16 border border-gold/10 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-gold/20 pointer-events-none">
              <span className="material-symbols-outlined text-9xl">architecture</span>
            </div>
            <div className="relative z-10 space-y-16">
              <div className="space-y-2 text-left">
                <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">Section II</span>
                <h2 className="text-3xl font-display font-bold text-parchment">Architectural Philosophy</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { icon: 'grid_4x4', title: 'Golden Ratio Grids', desc: 'Using classical proportions to anchor modern interfaces in timeless harmony.' },
                  { icon: 'ink_pen', title: 'Intentional Typography', desc: 'Monospaced logic meets serif elegance, ensuring legibility and scholarly character.' },
                  { icon: 'palette', title: 'Organic Palettes', desc: 'Colors sampled from old-growth forests, oxidized copper, and dried ink.' }
                ].map((phil, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="space-y-4 group text-left"
                  >
                    <div className="size-12 border border-gold flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-espresso transition-all duration-300">
                      <span className="material-symbols-outlined">{phil.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-parchment">{phil.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-dim">{phil.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
