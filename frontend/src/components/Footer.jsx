import CRTToggle from './CRTToggle';

export default function Footer() {
  const socials = [
    { name: 'Github', icon: 'data_object', url: 'https://github.com/PradyumnKR' },
    { name: 'LinkedIn', icon: 'connect_without_contact', url: 'https://www.linkedin.com/in/pradyumn-kumar-shukla/' },
    { name: 'Twitter', icon: 'terminal', url: 'https://x.com/Pradyumn4672' },
  ];

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;

  return (
    <footer className="w-full bg-[#0e0c09] border-t border-[rgba(200,169,110,0.2)] px-6 sm:px-12 pt-10 pb-8 relative z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="font-mono text-[13px] font-bold text-[#c8a96e] tracking-[0.25em]">
              PRADYUMN <span className="text-[rgba(200,169,110,0.5)] tracking-[0.15em] font-normal block sm:inline sm:ml-2">// THE ARCHIVIST</span>
            </div>
            <div className="font-mono text-[9px] text-[rgba(200,169,110,0.35)] tracking-[0.15em] mt-[6px] uppercase">
              NOCTURNE STUDIES // Est. 2026
            </div>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-[#3aff6a] animate-[statusPulseOnline_2s_ease-in-out_infinite]"></div>
              <span className="font-mono text-[10px] text-[#c8a96e]/60 tracking-[0.2em] uppercase">All Systems Nominal</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] text-[rgba(200,169,110,0.6)] tracking-[0.15em] uppercase hover:text-[#c8a96e] hover:opacity-100 transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[14px]">{social.icon}</span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
            <div className="space-y-1.5">
              <div className="font-mono text-[10px] text-[rgba(200,169,110,0.5)] tracking-[0.15em] uppercase">
                Archive Depth // 07
              </div>
              <div className="font-mono text-[10px] text-[rgba(200,169,110,0.5)] tracking-[0.15em] uppercase">
                Last Updated // {formattedDate}
              </div>
            </div>
            <CRTToggle />
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-[rgba(200,169,110,0.08)]"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="font-mono text-[9px] text-[rgba(200,169,110,0.3)] tracking-[0.1em] uppercase">
            © EST. 2026 NOCTURNE STUDIES.
          </div>
          <div className="font-serif italic text-[11px] text-[rgba(200,169,110,0.25)]">
            built with ancient wisdom and modern tools.
          </div>
        </div>
      </div>
    </footer>
  );
}
