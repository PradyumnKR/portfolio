import StatusIndicator from './StatusIndicator';

export default function Footer() {
  const socials = [
    { name: 'Github', icon: 'data_object', url: 'https://github.com/PradyumnKR' },
    { name: 'LinkedIn', icon: 'connect_without_contact', url: 'https://www.linkedin.com/in/pradyumn-kumar-shukla/' },
    { name: 'Twitter', icon: 'terminal', url: 'https://x.com/Pradyumn4672' },
  ];

  return (
    <footer className="relative z-10 py-24 px-6 border-t border-gold/5 bg-[#120d09]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="flex items-center gap-16">
          {socials.map((social) => (
            <a 
              key={social.name}
              href={social.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase text-ink-dim hover:text-gold transition-all"
            >
              <span className="material-symbols-outlined text-[18px] opacity-40 group-hover:opacity-100">{social.icon}</span>
              {social.name}
            </a>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <StatusIndicator 
            state="online" 
            label="ALL SYSTEMS NOMINAL" 
            className="text-gold/40 mb-2"
          />
          <div className="w-12 h-px bg-gold/10"></div>
          <p className="text-[10px] text-ink-dim uppercase tracking-[0.5em] text-center opacity-60">
            © 1892-2024 Digital Scriptorium. <br/>
            <span className="text-[9px] mt-2 block italic lowercase tracking-normal">Built with ancient wisdom and modern tools.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
