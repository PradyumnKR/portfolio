import { motion } from 'framer-motion';
import StatusIndicator from '../components/StatusIndicator';

export default function About() {
  return (
    <div className="about-page bg-[#0e0c09] min-h-screen">
      <main className="flex flex-col items-center">
        <div className="max-w-[1000px] w-full px-6 py-12 md:py-20">
          {/* Section I: The Protagonist */}
          <section className="grid md:grid-cols-12 gap-12 items-center mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative group"
            >
              <div className="absolute inset-0 border-2 border-gold translate-x-4 translate-y-4 -z-10 opacity-40"></div>
              <div className="archival-frame aspect-[3/4] bg-[#1a1712] overflow-hidden border border-gold/20 relative transition-[filter] duration-400 ease-in-out hover:[filter:contrast(1.2)_brightness(0.9)_grayscale(10%)]">
                <img 
                  alt="Julian Thorne" 
                  className="w-full h-full object-cover object-top block mix-blend-luminosity [filter:contrast(1.1)_brightness(0.85)_grayscale(10%)]" 
                  src="/assets/portrait.png"
                />
                {/* LAYER 2 — CLASSIFIED stamp */}
                <span className="absolute bottom-[16px] left-1/2 -translate-x-1/2 -rotate-8 py-[3px] px-[8px] border border-gold/40 text-[10px] font-mono uppercase tracking-[0.2em] text-gold/60 z-40 whitespace-nowrap bg-espresso/40 backdrop-blur-sm">
                  IDENTITY UNVERIFIED
                </span>
                {/* LAYER 3 — Film grain noise */}
                <div className="archival-noise"></div>
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

          {/* FIX 1 — Genesis of Thought Section with integrated stamp */}
          <section className="mb-16 md:mb-20 relative pt-4">
            {/* SECTION STAMP - Integrated within section top spacing */}
            <div className="w-full mb-10">
              <div className="flex justify-end mb-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-gold/55">
                  FILE // PERSONAL_RECORD // SECTION_01
                </span>
              </div>
              <div className="h-px w-full bg-gold/20"></div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="space-y-8 text-ink-dim leading-loose text-justify pl-6 md:pl-8 border-l-2 border-gold/40">
                {/* FIX 2 — Heading alignment to LEFT inside the border accent */}
                <div className="text-left space-y-2 mb-10">
                  <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block">Chapter I</span>
                  <h2 className="text-3xl font-display font-bold text-parchment">The Genesis of Thought</h2>
                </div>

                <p className="first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-gold">
                  In the quiet corners of forgotten libraries, among the scent of aged paper and leather bindings, I found my true calling. My journey began not with a screen, but with a manual typewriter—a tool that demanded intentionality in every stroke. This tactile beginning shaped my understanding of design as something permanent and heavy, rather than fleeting.
                </p>
                <p>
                  Over the past decade, I have curated digital experiences that mirror the <span className="redacted">structured</span> permanence of a well-worn book. I believe that a user's journey through a website should feel like turning pages—each interaction a deliberate movement, each layout a composition of classical balance and modern utility.
                </p>
                
                {/* SECTION END MARKER */}
                <div className="pt-8 text-center">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold/40">
                    — END OF RECORD —
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section II: Current Objective */}
          <section className="flex flex-col items-center pt-12 md:pt-16 mb-20 border-t border-gold/10">
            <div className="w-full max-w-[680px]">
              <div className="text-left mb-4">
                <span className="text-gold/60 text-[10px] font-mono uppercase tracking-[0.25em]">
                  DIRECTIVE // ACTIVE CLEARANCE
                </span>
              </div>
              
              <div className="relative bg-gold/[0.04] border border-gold/15 p-8 md:px-10 md:py-8 overflow-hidden">
                {/* Corner Detail */}
                <span className="absolute top-4 right-4 text-gold/30 font-mono text-[9px] uppercase">
                  FORM-09 // CURRENT
                </span>

                <div className="space-y-6">
                  {[
                    { label: 'SEEKING:', val: 'Full-Stack / Frontend Engineer' },
                    { label: 'CLEARANCE:', val: 'Entry Level' },
                    { label: 'AVAILABILITY:', val: 'Immediate Deployment' },
                    { label: 'BASE LOCATION:', val: 'Remote-First' },
                    { label: 'STATUS:', val: <StatusIndicator state="online" label="AVAILABLE FOR MISSION" className="text-parchment/85" /> },
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-baseline">
                      <span className="w-[140px] shrink-0 text-gold/70 font-mono text-[11px] uppercase tracking-[0.15em] mb-1 sm:mb-0">
                        {row.label}
                      </span>
                      {/* FIX 3 — Tighten value font size and weight */}
                      <span className="text-[13px] font-normal leading-relaxed text-parchment/85 font-serif">
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Stamp */}
                <div className="mt-8 pt-6 border-t border-dashed border-gold/20 text-center">
                  <span className="text-gold/35 font-mono text-[9px] uppercase tracking-widest">
                    AUTHORIZED FOR GENERAL CIRCULATION
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
