import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import StatusIndicator from "../components/StatusIndicator";

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // Replace with your EmailJS Public Key
      );

      setStatus("success");

      // Reset form after 3 seconds
      // setTimeout(() => {
      //   setStatus(null);
      //   setFormData({ name: "", email: "", message: "" });
      //   if (formRef.current) formRef.current.reset();
      // }, 3000);
    } catch (error) {
      console.error("Transmission failed:", error);
      setStatus("error");
    }
  };

  const getButtonStyles = () => {
    if (status === "success")
      return "border-[rgba(74,222,128,0.5)] text-[#4ade80]";
    if (status === "error")
      return "border-[rgba(239,68,68,0.5)] text-[#ef4444]";
    return "border-[rgba(200,169,110,0.5)] text-[#c8a96e] hover:bg-[rgba(200,169,110,0.08)] hover:border-[#c8a96e] hover:shadow-[0_0_12px_rgba(200,169,110,0.12)]";
  };

  const getButtonText = () => {
    if (status === "submitting")
      return (
        <span className="flex items-center">
          TRANSMITTING<span className="animate-cursor-blink">_</span>
        </span>
      );
    if (status === "success") return "TRANSMISSION CONFIRMED ✓";
    if (status === "error") return "TRANSMISSION FAILED. RETRY";
    return "Dispatch Message";
  };

  return (
    <section className="contact-page bg-[#0e0c09] min-h-screen py-24">
      <div className="max-w-[1100px] mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-iron shadow-2xl rounded-xl overflow-hidden bg-transparent">
          {/* Sidebar */}
          <div
            className="lg:col-span-4 p-8 flex flex-col justify-between relative self-stretch border border-[rgba(200,169,110,0.2)] border-t-2 border-t-[rgba(200,169,110,0.5)] bg-[#1a1712]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          >
            <div className="relative z-10 text-left flex flex-col h-full">
              <div className="mb-12">
                <div className="text-[9px] tracking-[0.2em] text-[#c8a96e] opacity-40 font-mono mb-4 uppercase">
                  TRANSMISSION STATION // NODE_07
                </div>
                <h1 className="text-parchment text-3xl font-black leading-tight tracking-tighter uppercase font-mono">
                  The Visitor's Ledger
                </h1>
                <div className="h-1 w-20 bg-gold mt-4 opacity-40"></div>
              </div>

              <div className="space-y-0 border-l-2 border-[rgba(200,169,110,0.15)] pl-4">
                <div className="py-4 border-b border-[rgba(200,169,110,0.1)]">
                  <div className="flex items-center mb-1">
                    <span className="text-[#c8a96e] opacity-50 mr-[6px] text-[10px]">
                      ›
                    </span>
                    <p className="text-[#c8a96e] opacity-55 text-[9px] uppercase tracking-[0.2em] font-mono">
                      Office Hours
                    </p>
                  </div>
                  <p className="text-[rgba(240,234,216,0.8)] font-mono text-[12px]">
                    09:00 — 21:00 IST
                  </p>
                </div>
                <div className="py-4 border-b border-[rgba(200,169,110,0.1)]">
                  <div className="flex items-center mb-1">
                    <span className="text-[#c8a96e] opacity-50 mr-[6px] text-[10px]">
                      ›
                    </span>
                    <p className="text-[#c8a96e] opacity-55 text-[9px] uppercase tracking-[0.2em] font-mono">
                      Station Location
                    </p>
                  </div>
                  <p className="text-[rgba(240,234,216,0.8)] font-mono text-[12px]">
                    Jaipur, Rajasthan // India
                  </p>
                </div>
                <div className="py-4">
                  <div className="flex items-center mb-1">
                    <span className="text-[#c8a96e] opacity-50 mr-[6px] text-[10px]">
                      ›
                    </span>
                    <p className="text-[#c8a96e] opacity-55 text-[9px] uppercase tracking-[0.2em] font-mono">
                      Current Frequency
                    </p>
                  </div>
                  <p className="text-[rgba(240,234,216,0.8)] font-mono text-[12px]">
                    pradyumnkrshukla.4672@gmail.com
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-[rgba(200,169,110,0.1)]">
                <p className="text-[#c8a96e] opacity-40 text-[12px] italic font-serif leading-relaxed">
                  "Every word transmitted is a legacy recorded in the archives
                  of time."
                </p>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8 p-8 md:p-12 bg-[#221b11] relative">
            <div className="absolute top-0 right-0 p-4">
              <div className="border border-gold/40 rounded px-3 py-1 text-[10px] text-gold font-mono uppercase tracking-widest">
                Official Form No. 842
              </div>
            </div>

            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                <div className="size-20 rounded-full border-2 border-gold flex items-center justify-center">
                  <span className="material-symbols-outlined text-gold text-4xl">
                    check
                  </span>
                </div>
                <h2 className="text-gold text-2xl font-mono uppercase tracking-widest">
                  Transmission Received
                </h2>
                <p className="text-ink-dim font-mono italic">
                  Your dispatch has been successfully recorded in the archives.
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="text-gold text-xs uppercase tracking-widest border-b border-gold/40 pb-1"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-8 text-left"
              >
                <input type="hidden" name="to_name" value="Pradyumn" />
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[#c8a96e] opacity-60 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-sm">
                          person
                        </span>
                        Originating Sender
                      </label>
                      <input
                        required
                        name="from_name"
                        className="bg-[rgba(200,169,110,0.04)] border-0 border-b border-[rgba(200,169,110,0.25)] focus:border-b-[#c8a96e] focus:shadow-[0_2px_0_0_rgba(200,169,110,0.15)] focus:outline-none focus:bg-[rgba(200,169,110,0.06)] text-[#f0ead8] font-mono placeholder:text-[rgba(200,169,110,0.3)] w-full py-[10px] px-1 text-[13px] transition-all duration-250 ease-in-out"
                        placeholder="FULL NAME"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[#c8a96e] opacity-60 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-sm">
                          alternate_email
                        </span>
                        Return Frequency
                      </label>
                      <input
                        required
                        name="from_email"
                        className="bg-[rgba(200,169,110,0.04)] border-0 border-b border-[rgba(200,169,110,0.25)] focus:border-b-[#c8a96e] focus:shadow-[0_2px_0_0_rgba(200,169,110,0.15)] focus:outline-none focus:bg-[rgba(200,169,110,0.06)] text-[#f0ead8] font-mono placeholder:text-[rgba(200,169,110,0.3)] w-full py-[10px] px-1 text-[13px] transition-all duration-250 ease-in-out"
                        placeholder="ADDRESS@DOMAIN.COM"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-[#c8a96e] opacity-60 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-sm">
                        history_edu
                      </span>
                      The Transmission
                    </label>
                    <textarea
                      required
                      name="message"
                      className="w-full bg-[rgba(200,169,110,0.04)] border border-[rgba(200,169,110,0.15)] focus:border-[rgba(200,169,110,0.4)] focus:bg-[rgba(200,169,110,0.06)] focus:outline-none text-[#f0ead8] font-mono text-[13px] p-4 min-h-[200px] resize-y placeholder:text-[rgba(200,169,110,0.3)] transition-all duration-250 ease-in-out [scrollbar-width:thin] [scrollbar-color:rgba(200,169,110,0.3)_transparent]"
                      placeholder="Enter your message for the archives..."
                      rows="8"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-iron">
                    <div className="w-full md:w-auto">
                      <StatusIndicator
                        state="online"
                        label="Signal Strength: Optimal"
                        className="text-gold/40"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={`w-full md:w-auto px-8 sm:px-[32px] py-3.5 sm:py-[14px] bg-transparent border font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-250 ease-in-out ${getButtonStyles()} ${status === "submitting" ? "pointer-events-none" : ""}`}
                    >
                      {getButtonText()}
                      {status !== "submitting" &&
                        status !== "success" &&
                        status !== "error" && (
                          <span className="material-symbols-outlined text-[16px]">
                            send
                          </span>
                        )}
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-wax-red text-xs font-mono uppercase tracking-widest text-center mt-4">
                      Failed to send. The aether is disturbed.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Transmission Status Panel */}
        <div className="mt-6 w-full">
          <div className="border border-[rgba(200,169,110,0.1)] border-t-[rgba(200,169,110,0.25)] p-4 px-6 flex flex-col md:flex-row justify-between items-stretch md:items-center bg-transparent mt-6">
            {[
              {
                label: "Encryption",
                val: "Active",
                pulse: "status-blink-online",
              },
              { label: "Archive", val: "Online", pulse: "status-blink-online" },
              {
                label: "Response",
                val: "24—48 HRS",
                pulse: "status-blink-standby",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-1 items-center justify-center relative"
              >
                <div className="flex items-center gap-3 py-3 md:py-0 w-full md:w-auto justify-center">
                  <div
                    className={`w-[5px] h-[5px] rounded-full ${item.pulse}`}
                  ></div>
                  <div className="font-mono text-[10px] tracking-[0.15em] uppercase whitespace-nowrap">
                    <span className="text-[#c8a96e] opacity-50">
                      {item.label}:
                    </span>
                    <span className="text-[#c8a96e] opacity-85 ml-1">
                      {item.val}
                    </span>
                  </div>
                </div>
                {i < 2 && (
                  <>
                    <div className="hidden md:block w-px h-4 bg-[rgba(200,169,110,0.1)] mx-4 lg:mx-8 shrink-0"></div>
                    <div className="block md:hidden border-b border-[rgba(200,169,110,0.1)] absolute left-0 right-0 bottom-0"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
