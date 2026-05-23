import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transmissionSteps = [
  "INITIALIZING SECURE CHANNEL...",
  "ESTABLISHING NODE CONNECTION...",
  "ENCRYPTING PAYLOAD...",
  "ROUTING TRANSMISSION...",
  "VERIFYING SIGNAL INTEGRITY...",
  "AWAITING ARCHIVE RESPONSE...",
];

const generateTransmissionId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const randomChunk = (length) =>
    Array.from({ length }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");

  return `ARCH-${randomChunk(2)} :: ${randomChunk(6)}`;
};

const generateTelemetryData = () => ({
  node: `ARCH_0${Math.floor(Math.random() * 9 + 1)}`,
  signal: `${(Math.random() * 2 + 97).toFixed(2)}%`,
  latency: `${Math.floor(Math.random() * 40 + 10)}ms`,
  packet: `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
});

const generateSignalBars = () =>
  Array.from({ length: 8 }, () => ({
    heights: [
      `${Math.random() * 100}%`,
      `${Math.random() * 100}%`,
      `${Math.random() * 100}%`,
    ],
    duration: 0.5 + Math.random() * 0.5,
  }));

const TransmissionLoader = ({ status, onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [transmissionId] = useState(generateTransmissionId);
  const [telemetryData] = useState(generateTelemetryData);
  const [signalBars] = useState(generateSignalBars);
  const [fadeOut, setFadeOut] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < transmissionSteps.length) {
        const nextLog = transmissionSteps[logIndex] ?? "";
        setTimeout(() => {
          setLogs((prev) => [...prev, nextLog]);
        }, 0);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 600);

    const progressInterval = setInterval(() => {
      setTimeout(() => {
        setCurrentProgress((prev) => {
          if (status === "success" || status === "error") return 100;
          if (prev >= 95) return prev;
          return prev + Math.random() * 5;
        });
      }, 0);
    }, 400);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [status]);

  useEffect(() => {
    if ((status === "success" || status === "error") && currentProgress >= 100 && !completedRef.current) {
      completedRef.current = true;
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 100);
      const completeTimer = setTimeout(() => {
        setTimeout(() => {
          onComplete?.();
        }, 0);
      }, 400);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [status, currentProgress, onComplete]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === "success") {
        setLogs((prev) => [...prev, "TRANSMISSION SUCCESSFUL"]);
      } else if (status === "error") {
        setLogs((prev) => [...prev, "TRANSMISSION FAILED: UPLINK INTERRUPTED"]);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 bg-[rgba(22,14,7,0.76)] backdrop-blur-sm border border-gold/10 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(24,16,8,0.22)_50%),linear-gradient(90deg,rgba(200,169,110,0.08),rgba(200,169,110,0.02),rgba(200,169,110,0.08))] bg-[length:100%_4px,3px_100%]" />

      <div className="relative w-full max-w-md space-y-8">
        {/* Header Telemetry */}
        <div className="flex justify-between items-end border-b border-gold/20 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-mono text-gold uppercase tracking-[0.2em]">
                Uplink Active
              </span>
            </div>
            <div className="text-[8px] font-mono text-gold/40 uppercase tracking-widest">
              Node: {telemetryData.node} // Sig: {telemetryData.signal}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-mono text-gold/40 uppercase tracking-widest">
              Latency: {telemetryData.latency}
            </div>
            <div className="text-[8px] font-mono text-gold/40 uppercase tracking-widest">
              Pkt: {telemetryData.packet}
            </div>
          </div>
        </div>

        {/* Log Area */}
        <div className="h-48 overflow-hidden font-mono text-[11px] space-y-2">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={`${String(log)}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-3 ${
                  typeof log === "string" && log.includes("SUCCESS")
                    ? "text-[#4ade80]"
                    : typeof log === "string" && log.includes("FAILED")
                      ? "text-[#ef4444]"
                      : "text-gold/80"
                }`}
              >
                <span className="opacity-40">{`> `}</span>
                <span>{log}</span>
                {i === logs.length - 1 && status === "submitting" && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1.5 h-3 bg-gold/60"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cinematic Telemetry Panel */}
        <div className="rounded-2xl border border-gold/15 bg-[rgba(52,32,14,0.92)] p-4 text-[10px] font-mono uppercase tracking-[0.32em] text-gold/75 shadow-[0_0_30px_rgba(200,169,110,0.08)]">
          <div className="mb-3 text-[8px] text-gold/40 tracking-[0.5em]">
            SECURE UPLINK TELEMETRY
          </div>
          <div className="space-y-2">
            <div className="flex justify-between gap-3">
              <span className="text-gold/40">TRANSMISSION ID</span>
              <span className="font-semibold text-gold">
                {transmissionId}
                <span className="animate-pulse">_</span>
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gold/40">NODE</span>
              <span className="font-semibold text-gold">{telemetryData.node}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gold/40">SIGNAL</span>
              <span className="font-semibold text-gold">{telemetryData.signal}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gold/40">LATENCY</span>
              <span className="font-semibold text-gold">{telemetryData.latency}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gold/40">PACKET HASH</span>
              <span className="font-semibold text-gold">{telemetryData.packet}</span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[9px] font-mono text-gold/40 uppercase tracking-widest">
              Transmission Progress
            </span>
            <span className="text-[9px] font-mono text-gold/60">
              {Math.floor(currentProgress)}%
            </span>
          </div>
          <div className="relative h-1 w-full bg-[rgba(200,169,110,0.12)] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f5c67d] to-[#c38c14]"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ ease: "easeOut" }}
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,210,134,0.2)] to-transparent skew-x-12 animate-shimmer" />
          </div>

          {/* Animated Signal Bars */}
          <div className="flex justify-center gap-1 h-3 items-end">
            {signalBars.map((bar, i) => (
              <motion.div
                key={i}
                className="w-1 bg-[rgba(200,169,110,0.28)]"
                animate={{
                  height: bar.heights,
                  backgroundColor:
                    status === "success"
                      ? "rgba(245,198,125,0.5)"
                      : status === "error"
                        ? "rgba(239,68,68,0.28)"
                        : "rgba(200,169,110,0.3)",
                }}
                transition={{
                  repeat: Infinity,
                  duration: bar.duration,
                  repeatType: "mirror",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransmissionLoader;
