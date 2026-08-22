import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import GlitchText from "../components/GlitchText";
import { Link } from "react-router-dom";
import ChronicleStrip from "../components/ChronicleStrip";
import StatusIndicator from "../components/StatusIndicator";

const useGithubCommits = () => {
  const [totalCommits, setTotalCommits] = useState(() => {
    const cached = localStorage.getItem("github_commits_count");
    const timestamp = localStorage.getItem("github_commits_timestamp");
    const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours
    if (cached && timestamp && Date.now() - parseInt(timestamp) < CACHE_DURATION) {
      return parseInt(cached);
    }
    return null;
  });

  useEffect(() => {
    const fetchCommits = async () => {
      const username = "PradyumnKR";
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const cached = localStorage.getItem("github_commits_count");
      const timestamp = localStorage.getItem("github_commits_timestamp");
      const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

      // Skip fetch if cache is fresh
      if (cached && timestamp && Date.now() - parseInt(timestamp) < CACHE_DURATION) {
        return;
      }

      const headers = {
        Accept: "application/vnd.github.v3+json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
          { headers },
        );
        if (!reposRes.ok) throw new Error("GitHub repos fetch failed");
        const repos = await reposRes.json();
        const commitCounts = await Promise.all(
          repos.map(async (repo) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=1`,
                { headers },
              );

              if (res.status === 409) return 0;
              if (!res.ok) return 0;

              const link = res.headers.get("Link");
              if (link) {
                const match = link.match(/page=(\d+)>; rel="last"/);
                if (match) return parseInt(match[1]);
              }
              const commits = await res.json();
              return Array.isArray(commits) ? commits.length : 0;
            } catch {
              return 0;
            }
          }),
        );
        const total = commitCounts.reduce((sum, n) => sum + n, 0);
        setTotalCommits(total);
        localStorage.setItem("github_commits_count", String(total));
        localStorage.setItem("github_commits_timestamp", String(Date.now()));
      } catch (err) {
        console.error("GitHub API error:", err);
        if (cached) {
          setTotalCommits(parseInt(cached));
        }
      }
    };
    fetchCommits();
  }, []);

  return totalCommits;
};

const useDSAStats = () => {
  const [stats, setStats] = useState(() => {
    const cached = localStorage.getItem("dsa_stats");
    const timestamp = localStorage.getItem("dsa_stats_timestamp");
    const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours
    if (cached && timestamp && Date.now() - parseInt(timestamp) < CACHE_DURATION) {
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(!stats);

  useEffect(() => {
    const fetchStats = async () => {
      const leetcodeUser = import.meta.env.VITE_LEETCODE_USERNAME;
      const gfgUser = import.meta.env.VITE_GFG_USERNAME;
      const cached = localStorage.getItem("dsa_stats");
      const timestamp = localStorage.getItem("dsa_stats_timestamp");
      const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

      if (cached && timestamp && Date.now() - parseInt(timestamp) < CACHE_DURATION) {
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.allSettled([
          fetch(`https://leetcode-stats.tashif.codes/${leetcodeUser}`).then(
            (r) => (r.ok ? r.json() : Promise.reject("LC stats fail")),
          ),
          fetch(`https://gfg-stats.tashif.codes/${gfgUser}`).then((r) =>
            r.ok ? r.json() : Promise.reject("GFG fail"),
          ),
          fetch(
            `https://leetcode-stats.tashif.codes/${leetcodeUser}/heatmap`,
          ).then((r) => (r.ok ? r.json() : Promise.reject("LC heatmap fail"))),
          fetch(
            `https://leetcode-stats.tashif.codes/${leetcodeUser}/profile`,
          ).then((r) => (r.ok ? r.json() : Promise.reject("LC profile fail"))),
        ]);

        const lcData =
          results[0].status === "fulfilled" ? results[0].value : null;
        const gfgData =
          results[1].status === "fulfilled" ? results[1].value : null;
        const heatmapData =
          results[2].status === "fulfilled" ? results[2].value : null;
        const profileData =
          results[3].status === "fulfilled" ? results[3].value : null;

        const lcTotal = lcData?.totalSolved || 0;
        const lcEasy = lcData?.easySolved || 0;
        const lcMedium = lcData?.mediumSolved || 0;
        const lcHard = lcData?.hardSolved || 0;

        const gfgTotal = gfgData?.totalProblemsSolved || 0;
        const gfgEasy = gfgData?.Easy || 0;
        const gfgMedium = gfgData?.Medium || 0;
        const gfgHard = gfgData?.Hard || 0;

        let problemsThisWeek = 0;
        if (lcData?.submissionCalendar) {
          const nowSeconds = Math.floor(Date.now() / 1000);
          const sevenDaysAgo = nowSeconds - 7 * 86400;
          Object.entries(lcData.submissionCalendar).forEach(
            ([timestamp, count]) => {
              if (parseInt(timestamp) >= sevenDaysAgo) {
                problemsThisWeek += count;
              }
            },
          );
        }

        const latestProblem = profileData?.recentSubmissions?.find(
          (sub) => sub.statusDisplay === "Accepted",
        );

        const combinedStats = {
          total: lcTotal + gfgTotal,
          easy: lcEasy + gfgEasy,
          medium: lcMedium + gfgMedium,
          hard: lcHard + gfgHard,
          leetcode: {
            total: lcTotal,
            easy: lcEasy,
            medium: lcMedium,
            hard: lcHard,
            contributionPoints: lcData?.contributionPoints || 0,
            submissionCalendar: lcData?.submissionCalendar || null,
          },
          gfg: {
            total: gfgTotal,
            easy: gfgEasy,
            medium: gfgMedium,
            hard: gfgHard,
          },
          heatmap: {
            lastActiveDate: heatmapData?.lastActiveDate || "N/A",
            currentStreak: heatmapData?.currentStreak || 0,
          },
          latestProblem: latestProblem || null,
          problemsThisWeek,
        };

        setStats(combinedStats);
        localStorage.setItem("dsa_stats", JSON.stringify(combinedStats));
        localStorage.setItem("dsa_stats_timestamp", String(Date.now()));
      } catch (err) {
        console.error("Critical DSA stats error:", err);
        if (cached) {
          try {
            setStats(JSON.parse(cached));
          } catch {
            // ignore
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

const SegmentedBar = ({ percentage, color, isCritical }) => {
  return (
    <div className="flex gap-1 h-3 mt-3">
      {Array.from({ length: 10 }).map((_, i) => {
        const isActive = i / 10 < percentage;
        return (
          <motion.div
            key={i}
            initial={{ scaleY: 0.2 }}
            animate={{
              scaleY: isActive ? 1 : 0.2,
              backgroundColor: isActive ? color : "rgba(255,255,255,0.05)",
            }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className={`flex-1 rounded-sm ${isActive && isCritical ? "animate-pulse" : ""}`}
            style={{
              boxShadow: isActive ? `0 0 10px ${color}66` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

// ─── StatCounter ──────────────────────────────────────────────────────────────
// Drop-in replacement. Same props: target, duration, delay, formatter, className
// Fixes: formatter ref (no re-run), scramble interval cleanup, target=0 support
// ──────────────────────────────────────────────────────────────────────────────
const StatCounter = ({
  target,
  duration = 2000,
  delay = 0,
  formatter = (n) => n.toString(),
  className = "",
}) => {
  const [display, setDisplay] = useState("--");

  const formatterRef = useRef(formatter);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const rafRef = useRef(null);

  // Keep formatter updated
  useEffect(() => {
    formatterRef.current = formatter;
  }, [formatter]);

  useEffect(() => {
    // Cleanup helper
    const cleanup = () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
      rafRef.current = null;
    };

    const chars = "0123456789";

    // Core animation starter (safe to call multiple times)
    const startAnimation = () => {
      cleanup();

      timeoutRef.current = setTimeout(() => {
        // SCRAMBLE PHASE
        let scrambleCount = 0;

        intervalRef.current = setInterval(() => {
          const randomText = Array.from(
            { length: String(target).length || 1 },
            () => chars[Math.floor(Math.random() * chars.length)]
          ).join("");

          setDisplay(randomText);

          scrambleCount++;

          // End scramble
          if (scrambleCount >= 6) {
            clearInterval(intervalRef.current);

            // COUNT-UP PHASE
            const startTime = performance.now();

            const animate = (now) => {
              const elapsed = now - startTime;

              const progress = Math.min(elapsed / duration, 1);

              // Smooth cubic easing
              const eased = 1 - Math.pow(1 - progress, 3);

              const currentValue = Math.round(eased * target);

              setDisplay(formatterRef.current(currentValue));

              if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
              } else {
                // Ensure exact final value
                setDisplay(formatterRef.current(target));
              }
            };

            rafRef.current = requestAnimationFrame(animate);
          }
        }, 60);
      }, delay);
    };

    // Start immediately on mount/target change
    startAnimation();

    // Also restart when page is shown (covers bfcache/back-forward and some hard-reload cases)
    const handlePageShow = () => startAnimation();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") startAnimation();
    };

    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cleanup();
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [target, duration, delay]);

  return (
    <span className={className}>
      {display}
    </span>
  );
};

// Add this small component above Home, outside it
const LiveClock = () => {
  const [syncTime, setSyncTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setSyncTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-[8px] text-parchment font-mono">
      [{syncTime.toLocaleTimeString([], { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
      })} LOCAL_TIME]
    </span>
  );
};

export default function Home() {
  const githubCommits = useGithubCommits();
  const { stats: dsaStats, loading: dsaLoading } = useDSAStats();
  // eslint-disable-next-line no-unused-vars
  // const [time, setTime] = useState(new Date());
  // const [elapsed, setElapsed] = useState(0);
  // const [memAlloc] = useState(() => Math.floor(Math.random() * 200 + 400));
  const [showSubtitle, setShowSubtitle] = useState(false);

  const commitsFormatter = useCallback(
    (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K+" : n.toString()),
    [],
  );
  const artifactsFormatter = useCallback((n) => n.toString(), []);
  const sectionsFormatter = useCallback(
    (n) => n.toString().padStart(2, "0"),
    [],
  );
  const formatDSACount = useCallback((n) => n.toString().padStart(3, "0"), []);

  const tickerItems = [
    "STATUS OPTIMAL",
    "UPLINK ACTIVE",
    "NODE STABLE",
    "DOSSIER VERIFIED",
    "SIGNAL LOCKED",
    "SECTOR-7 ONLINE",
    "TRANSMISSION STABLE",
    "MEMORY CORE SYNCHRONIZED",
  ];

  // const [syncTime, setSyncTime] = useState(new Date());

  useEffect(() => {
  const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1500);
  return () => clearTimeout(subtitleTimer);
}, []);

  return (
    <div className="home-page bg-espresso">
      <section className="relative h-[calc(100vh-145px)] min-h-125 w-full flex items-center justify-center px-4 sm:px-6 md:px-20 overflow-hidden bg-espresso">
        {/* Subtle Surveyor Grid Drift Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.045]"
          style={{
            backgroundImage: `linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
            animation: "grid-drift 16s linear infinite",
          }}
        />
        <div className="archive-fog absolute -inset-16 z-0 pointer-events-none opacity-60" />
        <div className="absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="scan-beam absolute inset-y-0 left-0 z-[1] w-1/3 pointer-events-none opacity-20" />
        <div className="archive-watermark absolute left-1/2 top-[45%] z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] sm:text-[18vw] font-black uppercase tracking-[0.12em] text-gold pointer-events-none select-none opacity-10 sm:opacity-20">
          ARCHIVE NODE 01
        </div>
        <div className="archive-watermark absolute -right-8 sm:-right-16 bottom-12 sm:bottom-8 z-0 select-none whitespace-nowrap text-[12vw] sm:text-[9vw] font-black uppercase tracking-[0.18em] text-parchment pointer-events-none select-none opacity-5">
          CLASSIFIED
        </div>


        {/* Main Dramatic Layout */}
        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center justify-center text-center space-y-6 pt-6 px-4">
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-1"
          >
            <StatusIndicator
              state="standby"
              label="INITIALIZING ARCHIVE"
              className="px-3 py-1 border border-gold/30 text-[9px] sm:text-[10px] text-gold/80 bg-espresso/60 backdrop-blur shadow-[0_0_22px_rgba(197,160,89,0.08)]"
            />
          </motion.div>

          <h1 className="flex flex-col items-center justify-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-none drop-shadow-[0_0_24px_rgba(197,160,89,0.16)] relative z-10">
            <div style={{ color: "#c8a96e" }} className="opacity-100">
              <GlitchText text="PRADYUMN" />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showSubtitle ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="text-[9px] sm:text-[10px] md:text-[12px] uppercase tracking-[0.6em] sm:tracking-[0.9em] mt-4 block"
              style={{ color: "rgba(200, 169, 110, 0.7)" }}
            >
              // THE ARCHIVIST
            </motion.span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-1 text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.38em] text-gold/35 font-mono">
            <span>NODE ACCESS // VERIFIED</span>
            <span className="hidden h-px w-12 bg-gold/20 sm:block"></span>
            <span>DOSSIER ACTIVE // LIVE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="pt-6 flex items-center justify-center gap-8"
          >
            <Link
              to="/projects"
              className="crt-button group relative px-8 py-3 overflow-hidden border border-gold/40 text-[9px] font-bold tracking-[0.4em] uppercase text-gold hover:text-espresso transition-colors duration-500 inline-flex items-center gap-4 bg-espresso/40 backdrop-blur"
            >
              <span className="relative z-10">Access Terminal</span>
              <span className="material-symbols-outlined relative z-10 text-[12px]">
                arrow_forward_ios
              </span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Surveillance Terminal Ticker Strip */}
      <div className="relative h-10 bg-[#0e0c09] border-y border-gold/30 flex items-center overflow-hidden shadow-[0_0_12px_rgba(200,169,110,0.08)] group/ticker animate-ticker-pulse">
        {/* Environmental Overlays */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==')] mix-blend-overlay"></div>
        <div
          className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none"
          style={{ animation: "ticker-sweep 15s linear infinite" }}
        />

        <div
          className="flex w-max min-w-max animate-marquee hover:text-gold/90 transition-colors duration-300 animate-ticker-flicker whitespace-nowrap items-center"
          style={{ animationDuration: "48s" }}
        >
          {[1, 2, 3].map((set) => (
            <div
              key={set}
              className="flex shrink-0 items-center text-[10px] text-gold/60 font-mono uppercase tracking-[0.3em]"
            >
              {tickerItems.map((item, index) => (
                <div
                  key={`${set}-${item}`}
                  className="flex shrink-0 items-center"
                >
                  <span className="shrink-0">{item}</span>
                  <StatusIndicator
                    state={index % 3 === 1 ? "standby" : "online"}
                    showLabel={false}
                    className="mx-12 shrink-0"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="relative z-10 bg-[#0e0c09] py-20 px-6 overflow-hidden">
        <div className="archive-fog absolute -inset-24 opacity-20 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Dossier Snapshot - Quote Style */}
            <div className="relative pl-8 sm:pl-12 border-l-2 border-gold/40 py-4">
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[80px] sm:text-[120px] text-gold/10 font-serif opacity-[0.07] pointer-events-none select-none">
                "
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl text-parchment leading-relaxed font-serif italic relative z-10">
                I don't just write code. I architect systems that think,
                interfaces that breathe, and experiences that linger.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-8 h-px bg-gold/30"></div>
                <span className="text-[9px] sm:text-[10px] text-gold/60 uppercase tracking-widest font-mono">
                  — Archive // P.K. Shukla
                </span>
              </div>
            </div>

            {/* Stat Grid with Corner Brackets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {[
                {
                  label: "Commits",
                  val: githubCommits || null,
                  icon: "terminal",
                  duration: 2500,
                  delay: 0,
                  formatter: commitsFormatter,
                },
                {
                  label: "Artifacts",
                  val: 6,
                  icon: "deployed_code",
                  duration: 2000,
                  delay: 200,
                  formatter: artifactsFormatter,
                },
                {
                  label: "Sectors",
                  val: 8,
                  icon: "grid_view",
                  duration: 1500,
                  delay: 400,
                  formatter: sectionsFormatter,
                },
                {
                  label: "Status",
                  val: "AVAILABLE",
                  icon: "fiber_manual_record",
                  pulse: true,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-gold/5 p-5 px-6 border border-gold/10 group overflow-hidden stat-sweep"
                >
                  {/* Corner Brackets */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold/20 opacity-40 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex items-center gap-3 mb-2">
                    {stat.pulse ? (
                      <StatusIndicator state="online" showLabel={false} />
                    ) : (
                      <span className="material-symbols-outlined text-sm text-gold/40">
                        {stat.icon}
                      </span>
                    )}
                    <span className="text-[8px] text-gold/50 uppercase tracking-[0.3em] font-mono">
                      {stat.label}
                    </span>
                  </div>
                  {typeof stat.val === "number" && stat.val > 0 ? (
                    <StatCounter
                      // key={stat.val}
                      target={stat.val}
                      duration={stat.duration}
                      delay={stat.delay}
                      formatter={stat.formatter}
                      className="text-xl font-bold text-parchment font-mono"
                    />
                  ) : (
                    <div className="text-xl font-bold text-parchment font-mono">
                      {stat.val === null ? (
                        <span className="opacity-40 animate-pulse">--</span>
                      ) : (
                        stat.val
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REDESIGNED DSA ARCHIVE TELEMETRY PANEL — max-w-4xl TIGHT COMPOSITION */}
      <section className="relative z-10 bg-[#0e0c09] py-24 px-6 overflow-hidden">
        <div className="archive-fog absolute -inset-24 opacity-30 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-4xl mx-auto relative">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold animate-pulse" />
                <span className="text-gold/80 text-[10px] uppercase tracking-[0.5em] font-mono font-bold">
                  INTEL_NODE // DSA_ARCHIVE_07
                </span>
              </div>
              <h2 className="text-parchment/40 text-[9px] uppercase tracking-[0.3em] font-mono">
                SITUATIONAL AWARENESS // PROBLEM_LOG_SYNCED
              </h2>
            </div>
          </div>

          {/* HERO ELEMENT — TOTAL SOLVED (Massive Centered) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-20 py-12 flex flex-col items-center justify-center group"
          >
            {/* Corner Bracket Decorations */}
            <div className="absolute top-0 left-1/4 w-12 h-12 border-t-2 border-l-2 border-gold/30 opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-1/4 w-12 h-12 border-t-2 border-r-2 border-gold/30 opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-1/4 w-12 h-12 border-b-2 border-l-2 border-gold/30 opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-1/4 w-12 h-12 border-b-2 border-r-2 border-gold/30 opacity-40 group-hover:opacity-100 transition-opacity" />

            <span className="text-[10px] text-gold/40 uppercase tracking-[0.6em] font-mono mb-4 block">
              0X_TOTAL_SOLVED_METRIC
            </span>

            <div className="text-[clamp(4rem,15vw,10rem)] font-black text-gold font-mono tracking-tighter leading-[1.1] relative">
              <div
                className="absolute inset-0 blur-3xl opacity-20 bg-gold rounded-full"
                style={{ filter: "blur(60px)" }}
              />
              {/* // AFTER — always render StatCounter, pass null while loading: */}
              <StatCounter
                target={dsaStats?.total ?? null}
                duration={2500}
                delay={0}
                formatter={formatDSACount}
                className="relative z-10"
              />
            </div>
            <div className="text-gold/60 text-[10px] font-bold tracking-[0.4em] uppercase font-mono mt-4">
              VERIFIED_SOLUTIONS_ARCHIVED
            </div>
          </motion.div>

          {/* DIFFICULTY BREAKDOWN — THREE TACTICAL CARDS (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                label: "ALPHA_EASY",
                key: "easy",
                color: "#22c55e",
                bg: "rgba(34,197,94,0.03)",
                border: "rgba(34,197,94,0.15)",
              },
              {
                label: "BETA_MEDIUM",
                key: "medium",
                color: "#f59e0b",
                bg: "rgba(245,158,11,0.03)",
                border: "rgba(245,158,11,0.15)",
              },
              {
                label: "GAMMA_HARD",
                key: "hard",
                color: "#ef4444",
                bg: "rgba(239,68,68,0.03)",
                border: "rgba(239,68,68,0.15)",
                isCritical: true,
              },
            ].map((diff, idx) => (
              <motion.div
                key={diff.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="p-6 border relative overflow-hidden group"
                style={{ backgroundColor: diff.bg, borderColor: diff.border }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className="text-[9px] uppercase tracking-[0.3em] font-mono font-bold"
                    style={{ color: diff.color }}
                  >
                    {diff.label}
                  </span>
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: diff.color }}
                  >
                    {dsaLoading
                      ? "--"
                      : dsaStats?.[diff.key]?.toString().padStart(2, "0")}
                  </div>
                </div>

                <SegmentedBar
                  percentage={
                    dsaStats?.total ? dsaStats[diff.key] / dsaStats.total : 0
                  }
                  color={diff.color}
                  isCritical={diff.isCritical && dsaStats?.[diff.key] < 15}
                />

                {diff.isCritical && dsaStats?.[diff.key] < 15 && (
                  <span className="text-[7px] text-red-500/60 uppercase font-mono tracking-widest block mt-2 animate-pulse">
                    CRITICAL_LOW_SIGNAL
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* TELEMETRY METADATA STRIP (2-col grid) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 px-6">
            {[
              {
                label: "CONTRIB_PTS",
                val: dsaStats?.leetcode?.contributionPoints || 0,
              },
              { label: "LANG_PRIMARY", val: "C++ // PYTHON" },
              { label: "PROBLEMS_7D", val: dsaStats?.problemsThisWeek || 0 },
              {
                label: "LAST_ACTIVE",
                val: dsaStats?.heatmap?.lastActiveDate || "N/A",
              },
              {
                label: "ACTIVE_STREAK",
                val: `${dsaStats?.heatmap?.currentStreak || 0} DAYS`,
              },
              {
                label: "NODE_STATUS",
                val: (
                  <div className="flex items-center gap-2 text-green-500">
                    ONLINE{" "}
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
                ),
              },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <span className="text-[8px] text-gold/40 uppercase tracking-[0.3em] font-mono">
                  {stat.label}
                </span>
                <div className="text-[10px] font-bold text-parchment font-mono tracking-wider">
                  {stat.val}
                </div>
              </div>
            ))}
          </div>

          {/* LATEST SOLVED PROBLEM PANEL */}
          {dsaStats?.latestProblem && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12 p-5 border-l-2 border-amber-500/40 bg-amber-500/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-amber-500/20 bg-amber-500/5 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-none stroke-amber-500 stroke-2 animate-pulse"
                  >
                    <circle cx="12" cy="12" r="9" strokeOpacity="0.2" />
                    <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                    <path d="M12 12l4-4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] text-amber-500/50 uppercase tracking-[0.4em] font-mono block">
                    LAST_INTERCEPTED_SIGNAL
                  </span>
                  <div className="text-sm font-bold text-parchment font-mono flex items-center gap-3">
                    {dsaStats.latestProblem.title}
                    {dsaStats.latestProblem.difficulty && (
                      <span
                        className="text-[7px] px-1.5 py-0.5 border uppercase tracking-tighter"
                        style={{
                          borderColor:
                            dsaStats.latestProblem.difficulty === "Easy"
                              ? "#22c55e"
                              : dsaStats.latestProblem.difficulty === "Medium"
                                ? "#f59e0b"
                                : "#ef4444",
                          color:
                            dsaStats.latestProblem.difficulty === "Easy"
                              ? "#22c55e"
                              : dsaStats.latestProblem.difficulty === "Medium"
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      >
                        {dsaStats.latestProblem.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-gold/20 font-mono uppercase tracking-[0.2em]">
                  RELATIVE_TIME
                </span>
                <div className="text-[10px] text-gold/60 font-mono">
                  {new Date(
                    parseInt(dsaStats.latestProblem.timestamp) * 1000,
                  ).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          )}

          {/* PLATFORM SUB-PANELS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LeetCode Primary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gold/[0.02] border border-gold/10 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border border-gold/20 bg-gold/5 flex items-center justify-center">
                  <span className="text-gold/60 text-xs font-mono font-bold">
                    &lt;/&gt;
                  </span>
                </div>
                <div>
                  <span className="text-[8px] text-gold/40 uppercase font-mono block">
                    NODE_IDENTIFIER
                  </span>
                  <span className="text-[10px] text-parchment font-bold font-mono uppercase tracking-widest">
                    LEETCODE_PRIMARY
                  </span>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <span className="text-[8px] text-gold/40 uppercase font-mono block text-right">
                    SOLVED
                  </span>
                  <span className="text-xs text-gold font-mono font-bold">
                    {dsaStats?.leetcode?.total || 0}
                  </span>
                </div>
                <div className="flex gap-0.5 h-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-green-500/40 rounded-full h-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* GFG Secondary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gold/[0.02] border border-gold/10 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border border-gold/20 bg-gold/5 flex items-center justify-center">
                  <span className="text-gold/60 text-xs font-mono font-bold">
                    &gt;_
                  </span>
                </div>
                <div>
                  <span className="text-[8px] text-gold/40 uppercase font-mono block">
                    NODE_IDENTIFIER
                  </span>
                  <span className="text-[10px] text-parchment font-bold font-mono uppercase tracking-widest">
                    GFG_SECONDARY
                  </span>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <span className="text-[8px] text-gold/40 uppercase font-mono block text-right">
                    SOLVED
                  </span>
                  <span className="text-xs text-gold font-mono font-bold">
                    {dsaStats?.gfg?.total || 0}
                  </span>
                </div>
                <div className="flex gap-0.5 h-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-amber-500/40 rounded-full h-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Metadata Strip */}
          <div className="mt-16 pt-6 border-t border-gold/15 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[8px] text-gold/20 font-mono uppercase tracking-[0.3em]">
                ARCHIVE SOURCES CONNECTED: LEETCODE_API // GFG_V2 // TASHIF_NODE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[8px] text-gold/40 font-mono uppercase tracking-[0.2em]">
                LAST_SYNC_TELEMETRY:
              </span>
              <LiveClock />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case File Upgrade */}
      <section className="py-20 px-6 bg-[#0e0c09]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-gold/60 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] whitespace-nowrap">
              Primary Classification
            </span>
            <div className="flex-1 h-px bg-gold/10"></div>
          </div>

          <Link to="/projects" className="block group">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative p-8 sm:p-12 border border-gold/20 overflow-hidden bg-[#1a1712] shadow-2xl"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(200,169,110,0.03) 0px, rgba(200,169,110,0.03) 1px, transparent 1px, transparent 10px)",
              }}
            >
              {/* Animated Corner Brackets */}
              <motion.div
                variants={{
                  initial: { top: 16, left: 16 },
                  animate: { top: 8, left: 8 },
                }}
                className="absolute w-4 h-4 border-t-2 border-l-2 border-gold/40"
              ></motion.div>
              <motion.div
                variants={{
                  initial: { top: 16, right: 16 },
                  animate: { top: 8, right: 8 },
                }}
                className="absolute w-4 h-4 border-t-2 border-r-2 border-gold/40"
              ></motion.div>
              <motion.div
                variants={{
                  initial: { bottom: 16, left: 16 },
                  animate: { bottom: 8, left: 8 },
                }}
                className="absolute w-4 h-4 border-b-2 border-l-2 border-gold/40"
              ></motion.div>
              <motion.div
                variants={{
                  initial: { bottom: 16, right: 16 },
                  animate: { bottom: 8, right: 8 },
                }}
                className="absolute w-4 h-4 border-b-2 border-r-2 border-gold/40"
              ></motion.div>

              {/* Watermark */}
              <div className="archive-watermark absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-10">
                <span className="text-[100px] sm:text-[180px] font-bold uppercase tracking-[0.2em] transform -rotate-[15deg] whitespace-nowrap">
                  CLASSIFIED
                </span>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                <div className="md:col-span-2 space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ color: ["#ef4444", "#c5a059", "#ef4444"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="px-3 py-1 border border-current text-[9px] font-bold uppercase tracking-widest"
                    >
                      DECLASSIFIED
                    </motion.div>
                    <span className="text-gold/40 font-mono text-[9px] sm:text-[10px]">
                      CASE_REF // ARCH-006
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-parchment uppercase tracking-tighter">
                    Ledgerly
                  </h3>
                  <p className="text-ink-dim text-base sm:text-lg leading-relaxed font-serif italic">
                    An AI-powered personal finance platform featuring an immutable
                    ledger, budgeting, analytics dashboards, and natural-language
                    transaction entry. Built with Next.js 16 and FastAPI.
                  </p>
                </div>
                <div className="flex flex-row md:flex-col justify-between md:justify-end items-end gap-4">
                  <div className="text-right">
                    <span className="text-[9px] text-gold/40 uppercase block mb-1">
                      Authorization
                    </span>
                    <span className="text-[10px] text-parchment font-mono">
                      LEVEL_3_CLEARED
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gold/40 uppercase block mb-1">
                      Checksum
                    </span>
                    <span className="text-[10px] text-parchment font-mono">
                      0x8C2F5...
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Chronicle Strip Timeline */}
      <section className="relative py-24 bg-[#1a1710] border-y border-gold/5 overflow-hidden">
        <div className="archive-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(100px,18vw,220px)] font-black uppercase tracking-[0.18em] text-gold pointer-events-none z-0">
          CHRONICLE
        </div>
        <div className="absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/[0.025] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <span className="text-gold material-symbols-outlined text-sm mb-2 animate-bounce">
              expand_more
            </span>
            <h2 className="text-[10px] uppercase tracking-[0.5em] text-gold/60">
              The Chronicle Strip
            </h2>
          </div>
          <ChronicleStrip />
        </div>
      </section>

      {/* Transmission CTA */}
      <section className="relative py-28 px-6 bg-[#0e0c09] overflow-hidden">
        <div className="archive-fog absolute -inset-24 opacity-28 pointer-events-none" />
        <div className="archive-watermark absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(80px,14vw,160px)] font-black uppercase tracking-[0.16em] text-gold pointer-events-none z-0">
          TRANSMISSION
        </div>
        {/* Full-width Divider with Text */}
        <div className="absolute top-0 left-0 z-20 w-full border-t border-gold/10 pt-5 text-center">
          <span className="inline-block px-5 bg-[#0e0c09] text-[9px] text-gold/50 uppercase tracking-[0.65em] font-mono whitespace-nowrap">
            // TRANSMISSION OPEN //
          </span>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10">
          <h2 className="text-4xl md:text-6xl italic font-light text-gold tracking-widest uppercase leading-tight">
            Ready to Forge the
            <br />
            Next Artifact?
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center"
          >
            <Link
              to="/contact"
              className="crt-button group relative px-12 py-5 bg-transparent border border-gold/40 text-[10px] font-bold tracking-[0.5em] uppercase text-gold overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-espresso transition-colors duration-300">
                Open a Channel
              </span>

              {/* Background Fill */}
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

              {/* Static Flicker Overlay on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:animate-[flicker_0.15s_infinite] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==')] mix-blend-overlay"></div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
