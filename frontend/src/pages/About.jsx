import { motion } from 'framer-motion';
import StatusIndicator from '../components/StatusIndicator';

export default function About() {
  return (
    <div className="about-page bg-[#0e0c09] min-h-screen">
      <main className="flex flex-col items-center">
        <div className="max-w-[1000px] w-full px-4 sm:px-6 py-12 md:py-20">
          {/* Section I: The Protagonist */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 relative group order-1 md:order-1 px-4 sm:px-0"
            >
              <div className="absolute inset-0 border-2 border-gold translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 -z-10 opacity-40"></div>
              <div className="archival-frame aspect-[3/4] bg-[#1a1712] overflow-hidden border border-gold/20 relative transition-[filter] duration-400 ease-in-out hover:[filter:contrast(1.2)_brightness(0.9)_grayscale(10%)]">
                <img 
                  alt="Pradyumn Kumar Shukla" 
                  className="w-full h-full object-cover object-top block mix-blend-luminosity [filter:contrast(1.1)_brightness(0.85)_grayscale(10%)]" 
                  src="/assets/portrait.png"
                />
                {/* LAYER 2 — CLASSIFIED stamp */}
                <span className="absolute bottom-[16px] left-1/2 -translate-x-1/2 -rotate-8 py-[3px] px-[8px] border border-gold/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-gold/60 z-40 whitespace-nowrap bg-espresso/40 backdrop-blur-sm">
                  IDENTITY VERIFIED
                </span>
                {/* LAYER 3 — Film grain noise */}
                <div className="archival-noise"></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-7 flex flex-col gap-6 order-2 md:order-2"
            >
              <div className="space-y-3 text-left">
                <p className="text-gold text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold">Volume I. The Protagonist</p>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tighter text-parchment leading-none">Pradyumn Kumar Shukla</h1>
              </div>
              <div className="h-0.5 w-16 bg-gold"></div>
              <div className="space-y-4 text-left">
                <p className="text-base sm:text-lg leading-relaxed text-ink-dim italic">
                  "I don't just write code. I architect systems that think, interfaces that breathe, and experiences that linger long after the session ends."
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="w-8 h-px bg-gold/30"></div>
                  <span className="text-[9px] sm:text-[10px] text-gold/60 uppercase tracking-widest font-mono">— Archive // P.K. Shukla</span>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gold/5 border border-gold/10 text-[9px] sm:text-[10px] uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-sm text-gold">history_edu</span> Est. 2004
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gold/5 border border-gold/10 text-[9px] sm:text-[10px] uppercase tracking-tighter">
                    <span className="material-symbols-outlined text-sm text-gold">location_on</span> Udaipur, Rajasthan
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* FIX 1 — Genesis of Thought Section with integrated stamp */}
          <section className="mb-20 md:mb-24 relative pt-4">
            {/* SECTION STAMP - Integrated within section top spacing */}
            <div className="w-full mb-10">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.1em] text-gold/40">
                  REF_0x7B9C4
                </span>
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.15em] text-gold/55 text-right">
                  FILE // PERSONAL_RECORD // SECTION_01
                </span>
              </div>
              <div className="h-px w-full bg-gold/20"></div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="space-y-8 text-ink-dim leading-loose text-justify pl-4 sm:pl-8 border-l-2 border-gold/40">
                {/* FIX 2 — Heading alignment to LEFT inside the border accent */}
                <div className="text-left space-y-2 mb-10">
                  <span className="text-gold text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold block">Chapter I</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-parchment uppercase tracking-tight">The Genesis of Thought</h2>
                </div>

                <p className="text-base sm:text-lg first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-gold first-letter:leading-none">
                  ENTRY_LOG_START: My journey began not with a computer, but with curiosity — the kind that takes apart systems just to understand how they breathe. Raised in Udaipur, now operating out of Jaipur, I am a final-year B.Tech student in Artificial Intelligence and Data Science at JECRC, maintaining a 9.7 CGPA — not because grades define me, but because mastery does.
                </p>
                <p className="text-base sm:text-lg">
                  I build at the intersection of intelligence and interface. From React frontends that feel alive to ML pipelines that detect fraud in real-time — every artifact I create is deliberate, structured, and built to last. Currently deployed as an Associate ServiceNow Developer Intern at Netsmartz Infotech, automating enterprise workflows while preparing for full-scale deployment.
                </p>
                
                {/* SECTION END MARKER */}
                <div className="pt-8 text-center">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-gold/40">
                    — END OF RECORD —
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section II: Current Objective */}
          <section className="flex flex-col items-center pt-16 md:pt-20 mb-20 border-t border-gold/10">
            <div className="w-full max-w-[680px]">
              <div className="text-left mb-6">
                <span className="text-gold/60 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em]">
                  DIRECTIVE // ACTIVE CLEARANCE
                </span>
              </div>
              
              <div className="relative bg-gold/[0.04] border border-gold/15 p-6 sm:p-10 md:py-8 overflow-hidden shadow-2xl">
                {/* Corner Detail */}
                <span className="absolute top-4 right-4 text-gold/30 font-mono text-[8px] sm:text-[9px] uppercase">
                  FORM-09 // CURRENT
                </span>

                <div className="space-y-6 sm:space-y-7">
                  {[
                    { label: 'SEEKING:', val: 'Full-Stack / Frontend Engineer / SDE' },
                    { label: 'CLEARANCE:', val: 'Entry Level — 2026 Graduate' },
                    { label: 'AVAILABILITY:', val: 'Immediate Deployment' },
                    { label: 'BASE LOCATION:', val: 'Jaipur, Rajasthan // India' },
                    { label: 'STATUS:', val: <StatusIndicator state="online" label="AVAILABLE FOR MISSION" className="text-parchment/85" /> },
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-baseline border-b border-gold/5 pb-4 sm:border-none sm:pb-0">
                      <span className="w-full sm:w-[140px] shrink-0 text-gold/70 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] mb-1 sm:mb-0">
                        {row.label}
                      </span>
                      {/* FIX 3 — Tighten value font size and weight */}
                      <span className="text-[13px] sm:text-[14px] font-normal leading-relaxed text-parchment/85 font-serif">
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Stamp */}
                <div className="mt-10 pt-6 border-t border-dashed border-gold/20 text-center">
                  <span className="text-gold/35 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest">
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
