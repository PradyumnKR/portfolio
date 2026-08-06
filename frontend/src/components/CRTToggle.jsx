import { useState, useEffect } from 'react';

const CRTToggle = () => {
  const [crtEnabled, setCrtEnabled] = useState(() => {
    const cached = localStorage.getItem('crt_enabled');
    return cached === null ? true : cached === 'true';
  });

  useEffect(() => {
    if (crtEnabled) {
      document.body.classList.add('crt-overlay');
    } else {
      document.body.classList.remove('crt-overlay');
    }
    localStorage.setItem('crt_enabled', String(crtEnabled));
  }, [crtEnabled]);

  return (
    <button 
      onClick={() => setCrtEnabled(!crtEnabled)}
      className="mt-[10px] px-[10px] py-[4px] border border-[rgba(200,169,110,0.25)] text-[10px] font-mono text-[rgba(200,169,110,0.6)] uppercase tracking-[0.15em] hover:border-[#c8a96e] hover:text-[#c8a96e] transition-all duration-200"
    >
      [CRT: {crtEnabled ? 'ON' : 'OFF'}]
    </button>
  );
};

export default CRTToggle;
