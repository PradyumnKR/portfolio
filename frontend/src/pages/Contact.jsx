import { useState } from 'react';
import StatusIndicator from '../components/StatusIndicator';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if(res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-espresso min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-[1000px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-iron shadow-2xl rounded-xl overflow-hidden bg-leather/40">
          {/* Sidebar */}
          <div className="lg:col-span-4 bg-leather p-8 border-r border-iron flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoGGetdJXGd-ZCfS1D8UEGPRXYM8UWJuvUP0Yq6nFXQV6andPwIvXbw0OOVQMFzFc7hTz2IO8hdyA7zLt2LHfjo0lKXf86d5aJKJlxlWPps2pZ7dsjolszALUyoN4nZ92pvo4ECXsAqwbFTO9oWnpGh4JsW6YahzdqR9g3oOy8lNQ8tlD3oDFWV7vlQbmumSRFI5UJqNjgQVAXS_sq28UNHRHakZi8tMiPCCkQmHSqG2cPk6pKpqLgCv3cgrJhv9I_eZh4iaaqTBo')" }}></div>
            <div className="relative z-10 text-left">
              <div className="mb-8">
                <span className="material-symbols-outlined text-gold text-5xl mb-4">settings_input_antenna</span>
                <h1 className="text-parchment text-3xl font-black leading-tight tracking-tighter uppercase font-mono">The Visitor's Ledger</h1>
                <div className="h-1 w-20 bg-gold mt-4"></div>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-1">
                  <p className="text-brass text-xs uppercase tracking-[0.2em] font-bold">Office Hours</p>
                  <p className="text-ink-dim font-mono text-sm">08:00 — 18:00 GMT</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-brass text-xs uppercase tracking-[0.2em] font-bold">Station Location</p>
                  <p className="text-ink-dim font-mono text-sm">District VII, Old Academy Row</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-brass text-xs uppercase tracking-[0.2em] font-bold">Current Frequency</p>
                  <p className="text-ink-dim font-mono text-sm">hello@telegraph-office.io</p>
                </div>
              </div>
            </div>
            <div className="mt-12 relative z-10 text-left">
              <p className="text-gold/40 text-xs italic font-mono">"Every word transmitted is a legacy recorded in the archives of time."</p>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8 p-8 md:p-12 bg-[#221b11] relative">
            <div className="absolute top-0 right-0 p-4">
              <div className="border border-gold/40 rounded px-3 py-1 text-[10px] text-gold font-mono uppercase tracking-widest">Official Form No. 842</div>
            </div>
            
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                <div className="size-20 rounded-full border-2 border-gold flex items-center justify-center">
                  <span className="material-symbols-outlined text-gold text-4xl">check</span>
                </div>
                <h2 className="text-gold text-2xl font-mono uppercase tracking-widest">Transmission Received</h2>
                <p className="text-ink-dim font-mono italic">Your dispatch has been successfully recorded in the archives.</p>
                <button 
                  onClick={() => setStatus(null)}
                  className="text-gold text-xs uppercase tracking-widest border-b border-gold/40 pb-1"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 text-left">
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2 group">
                      <label className="text-brass text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">person</span>
                        Originating Sender
                      </label>
                      <input 
                        required
                        className="bg-transparent border-0 border-b border-iron focus:outline-none focus:ring-0 focus:border-gold text-parchment font-mono placeholder:text-iron w-full py-2 px-0 text-lg uppercase transition-all" 
                        placeholder="FULL NAME" 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="text-brass text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">alternate_email</span>
                        Return Frequency
                      </label>
                      <input 
                        required
                        className="bg-transparent border-0 border-b border-iron focus:outline-none focus:ring-0 focus:border-gold text-parchment font-mono placeholder:text-iron w-full py-2 px-0 text-lg transition-all" 
                        placeholder="ADDRESS@DOMAIN.COM" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-brass text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">history_edu</span>
                      The Transmission
                    </label>
                    <div className="relative bg-leather/20 rounded-lg p-6 border border-iron ledger-line">
                      <textarea 
                        required
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-parchment font-mono leading-[2rem] placeholder:text-iron resize-none p-0" 
                        placeholder="Enter your message for the archives..." 
                        rows="8"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-iron">
                    <StatusIndicator 
                      state="online" 
                      label="Signal Strength: Optimal" 
                      className="text-gold/40"
                    />
                    <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gold hover:bg-gold/80 text-espresso font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all rounded shadow-lg group">
                      <span>Dispatch Message</span>
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                    </button>
                  </div>
                  {status === 'error' && <p className="text-wax-red text-xs font-mono uppercase tracking-widest text-center mt-4">Failed to send. The aether is disturbed.</p>}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { icon: 'encrypted', title: 'Secure Link', desc: 'All transmissions are encrypted via brass-plated security protocols.' },
            { icon: 'auto_stories', title: 'Archive Entry', desc: 'A physical copy of your ledger entry will be stored in our subterranean vaults.' },
            { icon: 'schedule', title: 'Response Latency', desc: 'Expect a return transmission within 24 to 48 standard solar cycles.' }
          ].map((f, i) => (
            <div key={i} className="bg-leather/30 border border-iron p-6 rounded-lg flex items-start gap-4">
              <span className="material-symbols-outlined text-brass">{f.icon}</span>
              <div>
                <h4 className="text-parchment text-sm font-bold uppercase font-mono mb-1">{f.title}</h4>
                <p className="text-ink-dim text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
