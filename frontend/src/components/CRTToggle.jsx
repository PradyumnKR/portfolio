import { useState, useEffect } from 'react';

const CRTToggle = () => {
  const [crtEnabled, setCrtEnabled] = useState(true);

  useEffect(() => {
    if (crtEnabled) {
      document.body.classList.add('crt-overlay');
    } else {
      document.body.classList.remove('crt-overlay');
    }
  }, [crtEnabled]);

  return (
    <button 
      onClick={() => setCrtEnabled(!crtEnabled)}
      className="fixed bottom-5 right-5 z-[10000] px-3 py-1 bg-gold/5 border border-gold/20 text-[9px] font-mono text-gold/45 uppercase tracking-widest opacity-55 hover:opacity-100 hover:bg-gold hover:text-espresso focus-visible:opacity-100 transition-all md:bottom-6 md:right-6"
    >
      [CRT: {crtEnabled ? 'ON' : 'OFF'}]
    </button>
  );
};

export default CRTToggle;
