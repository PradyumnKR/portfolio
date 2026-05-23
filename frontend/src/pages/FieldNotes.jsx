import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ENTRIES = [
  {
    id: 1,
    date: "8 MAY 2026",
    title: "9.7 AND WHAT IT ACTUALLY MEANS",
    excerpt: "People find out the CGPA and assume I study constantly. That I love it. I used to be that person. Somewhere around 6th or 7th standard something shifted. The curiosity that used to pull me toward things above my grade level quietly stopped. I did not notice it leaving. I just noticed one day that studying had become something I did because I was supposed to...",
    content: `People find out the CGPA and assume I study constantly. That I love it. That I am the kind of person who is genuinely hungry for knowledge and always has been.

I used to be that person.

Somewhere around 6th or 7th standard something shifted. The competitiveness faded. The curiosity that used to pull me toward things above my grade level — books, concepts, problems I had no business attempting yet — quietly stopped. I did not notice 
it leaving. I just noticed one day that studying had become something I did because I was supposed to. An obligation. Not a field to explore.

Then came 10th standard. 85.8 percent. For most people that is a good result. For a kid who had always been above 90, who had quietly become "the smart one" in rooms full of people with expectations — it felt like evidence of something. Nobody said anything directly. Nobody had to. I had already learned to read the silence.

The 9.7 since then is real. So is the method behind it — pattern recognition, identifying what the exam actually tests, showing up 
consistently without necessarily going deep. There were semesters where I studied two hours before the paper. I knew I would get 9.5 so I did not push further. I am not proud of that and I am not ashamed of it either. It is just what happens when achievement becomes about satisfying a standard rather than feeding a curiosity.

I am trying to untangle those two things. It is slow work. The aversion that built up over years of performing intelligence for other people does not dissolve quickly. But I notice it now — the difference between doing something because I genuinely want to and doing something because I need someone to be satisfied.

That noticing is new. It feels like the beginning of something.

The number is 9.7. What it actually means is more complicated than I used to let myself admit.`,
    tags: ["PHILOSOPHY", "EDUCATION", "REFLECTION"],
    classification: "INTERNAL_MEMO"
  },
  {
    id: 2,
    date: "4 MAY 2026",
    title: "WHAT STARTED AS NOTHING",
    excerpt: "The first version of Scribe's Cipher was bad. I mean genuinely, objectively bad. No real CSS, a UI that nobody would have used even if the functionality had been good — which it wasn't. I built it while learning React basics. It was small enough to finish. That was the only criteria. I did not expect to ever open it again...",
    content: `The first version of Scribe's Cipher was bad. I mean genuinely, objectively bad. No real CSS, random module picking characters, a UI that nobody would have used even if the functionality had been good — which it wasn't. I built it while learning React basics. It was small enough to finish. That was the only criteria.

I did not expect to ever open it again.

Then I wanted to test something. I had been hearing a lot about using AI for development and I needed a project small enough to experiment on without risking anything I actually cared about. I opened the old password generator. Started prompting 
Gemini. Started adding things.

Then the palette came in.

I do not know how to fully describe what it felt like when the dark academia color scheme landed — the cards, the fonts, the theming system. One moment it was something I was mildly embarrassed to have 
made. The next it looked like something a real studio would ship. With a few prompts. That was genuinely crazy to me. Not in a frightening way. In a "wait, this is what's possible now?" way.

So I kept going. Dark mode, multiple themes, real entropy estimation using zxcvbn, crack-time prediction, passphrase generation, client-side persistence. Feature after feature. At some point 
I gave it a name — Scribe's Cipher — because it had earned one.

Then someone asked if it was deployed and I thought: why would I not deploy it? It has a name. It has features. It works. Vercel is free. 
Why leave something on localhost that is genuinely 
good just because it started as nothing?

So I shipped it.

That is maybe the most important thing I learned from this project — not the React 19 patterns or the zxcvbn integration. It is that the gap between "learning project" and "real product" is thinner 
than I thought. Sometimes you just have to keep adding things until it crosses the line. And then you deploy it, because why the hell wouldn't you.`,
    tags: ["SECURITY", "FRONTEND", "ENGINEERING","BUILDING"],
    classification: "INTERNAL_MEMO"
  },
  {
    id: 3,
    date: "2 FEB 2026",
    title: "ACCIDENTALLY LEARNING SOMETHING REAL",
    excerpt: "I will be honest. I did not choose fraud detection because I was passionate about financial security. I chose it because it was a college presentation deadline, the dataset was freely available on Kaggle, and it seemed straightforward enough to finish in time. That is how some of the best accidental learning happens...",
    content: `I will be honest. I did not choose fraud detection because I was passionate about financial security or machine learning ethics. I chose it because it was a college presentation deadline, the dataset was freely available on Kaggle, and it seemed straightforward enough to finish in time.

That is how some of the best accidental learning happens.

280,000 transactions. 492 fraudulent. I built the model, ran it, got 99% accuracy, and felt satisfied for approximately four minutes — until I realized the model had learned to say "not fraud" for everything. It was not detecting fraud. It was detecting the majority class. I had built something that was technically excellent and completely useless.

That was my introduction to the confusion matrix. Then recall. Then ROC curves. Then class imbalance. Then SMOTE. Term after term after term, each one unlocking another layer of something I thought I already understood. I will not pretend it was enjoyable in the moment — looking back it is fun to remember, but confronting that many new concepts at once while a deadline breathes down your neck is its own kind of chaos.

SMOTE rebalanced the dataset. Recall hit 0.92. The model finally learned to be suspicious in the right places.

Then came deployment. The trained model was 227MB. Streamlit's limit disagreed with that number. So I scaled the training data down from 250,000 records to 50,000, compressed the model, got it under the threshold, and shipped it. A 50,000 record dataset producing a file that size made me stop and think for a moment. If this tiny slice of one problem weighs this much — what does something like Claude or ChatGPT actually weigh? What kind of infrastructure holds that together?

It made those systems feel scarier honestly. Bigger than I had imagined. I have not gone deep into AI since — I still have the full backend stack to learn first, and I want to finish what I started before I open another door. But I think about that file size sometimes.

It is not that AI is hard. It is just that I am not used to it yet.There is a difference. I will get there.

Just not today.`,
    tags: ["ML", "RESEARCH", "PERSPECTIVE"],
    classification: "INTERNAL_MEMO"
  },
  {
    id: 4,
    date: "24 APR 2026",
    title: "THE NIGHT BEFORE THE FINAL ROUND",
    excerpt: "It was sometime past midnight. My friend was staying over. We had one night, one Arduino, one ultrasonic sensor, and a Firebase database neither of us had ever touched before. We did not know Arduino. We did not know Firebase. We had no one to call...",
    content: `It was sometime past midnight. My friend was staying over. We had one night, one Arduino, one ultrasonic sensor, and a Firebase database neither of us had ever touched before. The goal was to make the sensor detect distance, send that data to Firebase, and have it reflect correctly in our app — a small but real proof that our Smart Parking system could actually work.

We did not know Arduino. We did not know Firebase. We had no one to call.

That is the image I carry from Smart India Hackathon Prelims 2023. Not the presentation. Not the results ceremony. Just that room, that night, two second-year students reverse-engineering documentation they had never seen before, trying to will something into existence before morning.

Our project was a Real-Time Smart Parking and Traffic Management System. An app that showed users available parking spots, let them book in advance, and used ultrasonic sensors to detect whether a spot was occupied. The problem we were solving was real — illegal parking causing traffic congestion, vehicles circling blocks looking for spots that don't exist. Our solution was also real. Most of it just existed on paper and in research documents and in a UI that had no live backend.

Standing in front of the judges the next day, I knew we were presenting potential more than product. That felt like bluffing. But I have thought about it since and I do not think it was. A vision confidently explained is not a lie — it is a proposal. We had done the research. We had the CTR analysis, the system architecture, the tech stack rationale. We had a sensor that actually worked by the time we walked in.

I answered every question like I believed we could build it. Because I did.

We placed second. Out of every team in the college. First place went to a drone rescue system for disaster zones — honestly a betteridea, I cannot argue with that. But we were a new team, second year, first competition, no expectations. We just went and did whatever we could.

If I start thinking about what we could have done better, the list would not end. So I don't. 

We went in with nothing but intent. We came out with second place and the memory of a night where we figured out Firebase from scratch because there was simply no other option.

That is enough.`,
    tags: ["HACKATHON", "TEAMWORK ", "BEGINNINGS"],
    classification: "INTERNAL_MEMO"
  },
  {
    id: 5,
    date: "09 MAY 2026",
    title: "THE WATERMARKS NOBODY WILL SEE",
    excerpt: "There are large faded text elements behind the hero section of this portfolio. They breathe — opacity cycling slowly between 2.6% and 5.5%. Most people who visit this site will never notice them. They will feel the atmosphere. They will not know why. I know why. I put them there...",
    content: `There are large faded text elements behind the hero section of this portfolio. HIVE NODE. CLASSIFIED. They breathe — opacity cycling slowly between 2.6% and 5.5%, a CSS animation that took the better part of two days to get right.

Most people who visit this site will never notice them. They will feel the atmosphere. They will not know why.

I know why. I put them there.

The debug process was not glamorous. The watermarks kept vanishing — an animation keyframe overriding the base opacity, a browser rendering quirk, a screenshot tool inflating values so I could not even trust what I was seeing. Four, maybe five hours across two days. On the second day they disappeared again and I sat there thinking maybe I should just remove them. It would not change the portfolio dramatically. Nobody would notice something that was never there.

But I had seen them working. I knew what the page felt like with them in it versus without. And something in me refused. Not because of the technical challenge — the fix turned out to be a single keyframe adjustment. But because backing down felt like a different kind of failure. The kind where you know you left something unfinished and you just... decided that was acceptable.

It was not acceptable.

When it finally worked I did not celebrate. Did not tell anyone. Just looked at the page for a moment — the watermarks barely visible, doing exactly what they were supposed to do, invisible to almost everyone who will ever see this site.

Just a small win.

That is the one I will remember.`,
    tags: ["FRONTEND", "OBSESSION", "DESIGN"],
    classification: "INTERNAL_MEMO"
  },
  {
    id: 6,
    date: "08 APR 2026",
    title: "FOUNDATION FIRST",
    excerpt: "It started with a note-taking app. Everything lived in main.py. Every route, every handler, every piece of logic — one file, one room, everything piled in the corner. For something that small, it worked. I did not think about it too hard. Then I started planning the next one...",
    content: ` It started with a note-taking app. MongoDB, FastAPI, HTML, CSS, Bootstrap. Everything lived in main.py. Every route, every handler, every piece of logic — one file, one room, everything piled in the corner. For something that small, it worked.I did not think about it too hard.

Then I started planning the next one.

Shukla's Fitness. A cross-platform fitness tracker — Flutter for web and mobile, FastAPI as the backend, PostgreSQL as the database. Part of a larger software suite my brother has been building for our family for years. He handed me this one. I did not want to hand back something embarrassing.

I knew before writing a single line that main.py was not going to cut it. I could already feel where it would go — the same muddied feeling, except this time at a scale where it would actually hurt. So I stopped. I asked one question before touching the keyboard: "how do I build something clean enough that it still makes sense when it gets big?"

The answer came back: app/ api/ core/ db/ — modules with clear responsibilities, each directory knowing exactly what it is and what it is not. I read it and felt something I did not expect. Not surprise. Recognition. Like my gut had been right all along that there was a better way — I just had not known its name yet.

I set up the structure. Opened it in VS Code. Looked at the folder tree for a moment.

It felt like laying a proper foundation before the walls go up. Like the house does not exist yet, but now it can. Everything that comes after — every endpoint, every model, every service — has a place to belong. 

My brother built his suite line by line over years. I want what I add to it to still make sense to whoever reads it next. That starts with the foundation. It always starts with the foundation.`,
    tags: ["ENGINEERING", "ARCHITECTURE", "FASTAPI"],
    classification: "INTERNAL_MEMO"
  },
  {
    id: 7,
    date: "18 MAR 2026",
    title: "THE DOMAIN I NEVER PLANNED FOR",
    excerpt: "January 2026. First day at Netsmartz. Someone said the word 'ServiceNow' and I nodded like I knew what it meant. I did not...",
    content: `January 2026. First day at Netsmartz. Someone said the word "ServiceNow" and I nodded like I knew what it meant. I did not.

The first month was humbling in a way I had not experienced before. I had always been the person who understood the technology — at least enough to move forward. Here I was reading documentation at midnight, watching tutorials on GlideRecord and Business Rules, trying to build a mental model of a platform that had its own language, its own logic, its own way of seeing problems. I felt like a cartographer handed a map of a continent that did not exist yet.

But theoretical knowledge has a ceiling. I hit it fast. Reading about Client Scripts is not the same as debugging one at 11PM because a form is throwing a validation error nobody can explain. The classroom version of me would have panicked. Instead, I fixed it.

That first completed task — a workflow automation that had been sitting in the backlog for weeks — produced something I had not expected: clarity. Not just about ServiceNow. About how I learn. I do not absorb knowledge. I extract it from problems.

Since then I have said yes to everything. Every unfamiliar module, every ambiguous ticket, every task that begins with "we're not sure how to approach this." That discomfort is not a warning. It is the signal that something worth knowing is on the other side.

I did not plan to become a ServiceNow developer. But I have stopped believing that plans are the point. Adaptability is the point. The domain does not matter. The capacity to enter any domain and find your footing — that is the only skill that compounds forever.`,
    tags: ["REFLECTION ", "SERVICENOW", "CAREER","GROWTH"],
    classification: "INTERNAL_MEMO"
  }
].sort((a, b) => new Date(b.date) - new Date(a.date));

const Memo = ({ entry, index, onClick }) => (
  <motion.article 
    initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1 : 1 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    onClick={() => onClick(entry.id)}
    className="relative px-[32px] py-[28px] shadow-2xl group transition-all duration-300 cursor-pointer rounded-none border border-[rgba(200,169,110,0.15)] border-t-[rgba(200,169,110,0.4)] hover:border-t-[rgba(200,169,110,0.8)] hover:shadow-[0_0_20px_rgba(200,169,110,0.06)] overflow-hidden"
    style={{ 
      backgroundColor: '#1a1712',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
      backgroundSize: '200px 200px',
      backgroundBlendMode: 'overlay'
    }}
  >
    {/* Header */}
    <div className="flex justify-between items-start mb-4 border-b border-[rgba(200,169,110,0.25)] pb-4">
      <div className="space-y-1">
        <span className="text-[#c8a96e] opacity-60 font-mono text-[10px] uppercase tracking-widest font-bold">INTERNAL_MEMO</span>
        <h2 className="text-[#f0ead8] font-serif text-2xl font-bold tracking-tight uppercase leading-none">{entry.title}</h2>
      </div>
      <div className="text-right">
        <span className="text-[#c8a96e] opacity-70 font-mono text-[10px] font-bold">{entry.date}</span>
      </div>
    </div>

    {/* Content */}
    <div className="space-y-6">
      <p className="font-mono text-[13px] leading-[1.8] text-[rgba(240,234,216,0.75)] text-justify line-clamp-3">
        {entry.excerpt}
      </p>
      
      <div className="flex flex-wrap gap-2 pt-4">
        {entry.tags.map(tag => (
          <span key={tag} className="border border-[rgba(200,169,110,0.3)] text-[#c8a96e] opacity-70 bg-transparent text-[10px] font-mono px-[8px] py-[2px] uppercase tracking-tighter">
            #{tag}
          </span>
        ))}
      </div>
    </div>

    {/* Footer Markings */}
    <div className="absolute bottom-4 right-8 rotate-[-15deg] pointer-events-none">
      <div className="border-2 border-[rgba(200,169,110,0.4)] text-[#c8a96e] opacity-50 font-mono px-3 py-1 text-[10px] font-bold uppercase">
        ARCHIVED
      </div>
    </div>
  </motion.article>
);

export default function FieldNotes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const allTags = Array.from(new Set(ENTRIES.flatMap(e => e.tags)));

  const handleTagClick = (tag) => {
    setCurrentPage(1);
    if (tag === 'ALL') {
      setActiveTags([]);
    } else {
      setActiveTags(prev => {
        if (prev.includes(tag)) {
          return prev.filter(t => t !== tag);
        } else {
          return [...prev, tag];
        }
      });
    }
  };

  const filteredEntries = ENTRIES.filter(entry => {
    const query = debouncedQuery.toLowerCase();
    const matchesSearch = query === '' || 
                          entry.title.toLowerCase().includes(query) || 
                          entry.content.toLowerCase().includes(query);
    
    const matchesTags = activeTags.length === 0 || activeTags.every(tag => entry.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const totalEntries = filteredEntries.length;
  const totalPages = Math.ceil(totalEntries / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, totalEntries);
  const currentEntries = filteredEntries.slice(startIndex, endIndex);

  const selectedPostIndex = selectedPostId ? ENTRIES.findIndex(e => e.id === selectedPostId) : -1;
  const selectedPost = selectedPostId ? ENTRIES[selectedPostIndex] : null;

  const scrollToTop = () => {
    document.getElementById('post-list-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="journal-page bg-[#1a1710] min-h-screen py-24 px-6 relative overflow-hidden">
      {/* Wooden Desk Effect Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }}></div>
      
      <main className="max-w-4xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <header className="mb-10 text-left border-l-4 border-gold pl-4 sm:pl-8">
                <span className="text-gold/60 text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] block mb-2">The Chronicle // Logbook</span>
                <h1 className="text-3xl sm:text-5xl font-light text-parchment tracking-tighter uppercase leading-none">Field Notes</h1>
                <p className="text-ink-dim italic text-xs sm:text-sm mt-4">Manual observations and technical dispatches from the front lines of digital architecture.</p>
              </header>

              {/* Filter Bar */}
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-6 border-b border-[rgba(200,169,110,0.15)] pb-8 px-2 sm:px-0">
                <div className="flex items-center w-full sm:w-auto">
                  <span className="text-[#c8a96e] opacity-50 font-mono text-[11px] sm:text-[12px] mr-3 shrink-0">QUERY //</span>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SEARCH RECORDS..."
                    className="w-full sm:w-[240px] bg-[rgba(200,169,110,0.05)] border border-[rgba(200,169,110,0.2)] rounded-none px-[14px] py-[10px] sm:py-[8px] font-mono text-[12px] text-[#f0ead8] placeholder-[rgba(200,169,110,0.4)] focus:outline-none focus:border-[rgba(200,169,110,0.6)] transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <button 
                    onClick={() => handleTagClick('ALL')}
                    className={`border font-mono text-[10px] sm:text-[11px] px-[8px] py-[2px] uppercase tracking-tighter transition-colors ${activeTags.length === 0 ? 'bg-[rgba(200,169,110,0.15)] border-[#c8a96e] text-[#c8a96e]' : 'bg-transparent border-[rgba(200,169,110,0.25)] text-[#c8a96e] opacity-70 hover:opacity-100'}`}
                  >
                    ALL
                  </button>
                  {allTags.map(tag => {
                    const isActive = activeTags.includes(tag);
                    return (
                      <button 
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`border font-mono text-[10px] sm:text-[11px] px-[8px] py-[2px] uppercase tracking-tighter transition-colors ${isActive ? 'bg-[rgba(200,169,110,0.15)] border-[#c8a96e] text-[#c8a96e]' : 'bg-transparent border-[rgba(200,169,110,0.25)] text-[#c8a96e] opacity-70 hover:opacity-100'}`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div id="post-list-top" className="scroll-mt-12"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, exit: { duration: 0.2 } }}
                  className="space-y-12"
                >
                  {currentEntries.length > 0 ? (
                    currentEntries.map((entry, i) => (
                      <Memo key={entry.id} entry={entry} index={i} onClick={setSelectedPostId} />
                    ))
                  ) : (
                    <div className="py-12 text-center border border-[rgba(200,169,110,0.1)] bg-[#1a1712]">
                      <p className="text-[#c8a96e] font-mono text-sm uppercase tracking-widest opacity-80">
                        NO RECORDS MATCH THIS QUERY.<br/><span className="opacity-50 mt-2 block">ARCHIVE MAY BE CLASSIFIED.</span>
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Controls */}
              {totalEntries > 0 && (
                <div className="mt-20 flex flex-col items-center gap-6">
                  {/* Page Indicator */}
                  <div className="font-mono text-[10px] text-[#c8a96e] opacity-45 uppercase tracking-widest">
                    DISPLAYING PAGE {currentPage.toString().padStart(2, '0')} // RECORDS {String(startIndex + 1).padStart(2, '0')}-{String(endIndex).padStart(2, '0')}
                  </div>

                  {currentPage < totalPages ? (
                    <button 
                      onClick={() => {
                        setCurrentPage(p => p + 1);
                        scrollToTop();
                      }}
                      className="text-[#c8a96e]/60 hover:text-[#c8a96e] text-[10px] font-mono uppercase tracking-[0.4em] border-b border-[#c8a96e]/20 hover:border-[#c8a96e]/50 pb-1 transition-colors"
                    >
                      Seek Older Records_
                    </button>
                  ) : (
                    <div className="font-mono text-[11px] text-[#c8a96e] opacity-50 uppercase tracking-widest text-center mt-4">
                      ALL RECORDS RETRIEVED. ARCHIVE DEPTH REACHED.
                    </div>
                  )}

                  {/* Return to Recent */}
                  {currentPage > 1 && (
                    <button 
                      onClick={() => {
                        setCurrentPage(1);
                        scrollToTop();
                      }}
                      className="text-[#c8a96e]/40 hover:text-[#c8a96e]/80 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors mt-2"
                    >
                      &larr; RETURN TO RECENT TRANSMISSIONS
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button 
                onClick={() => setSelectedPostId(null)}
                className="mb-6 font-mono text-[11px] text-[#c8a96e] opacity-70 hover:opacity-100 transition-all hover:tracking-wide uppercase tracking-tighter"
              >
                &larr; RETURN TO ARCHIVE
              </button>
              
              <article 
                className="relative px-[56px] py-[48px] border border-[rgba(200,169,110,0.2)] rounded-none overflow-hidden"
                style={{ 
                  backgroundColor: '#1a1712',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
                  backgroundSize: '200px 200px',
                  backgroundBlendMode: 'overlay'
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[#c8a96e] opacity-60 font-mono text-[10px] uppercase tracking-widest font-bold">INTERNAL_MEMO</span>
                  <span className="text-[#c8a96e] opacity-70 font-mono text-[10px] font-bold">{selectedPost.date}</span>
                </div>
                
                <h1 className="text-[2rem] text-[#f0ead8] font-serif font-bold tracking-tight uppercase leading-none mb-6">
                  {selectedPost.title}
                </h1>
                
                <div className="border-b border-[rgba(200,169,110,0.25)] mb-6"></div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="border border-[rgba(200,169,110,0.3)] text-[#c8a96e] opacity-70 bg-transparent text-[10px] font-mono px-[8px] py-[2px] uppercase tracking-tighter">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-12 font-mono text-[10px] text-[#c8a96e] opacity-40 uppercase tracking-widest">
                  CLASSIFICATION: OPEN SOURCE // ENTRY LOG // FIELD DISPATCH
                </div>

                <div className="space-y-[20px] font-mono text-[13px] leading-[1.9] text-[rgba(240,234,216,0.8)] text-justify">
                  {selectedPost.content.split('\n').map((paragraph, idx) => {
                    if (paragraph.trim() === '* * *') {
                      return <div key={idx} className="text-center text-[#c8a96e] opacity-60 my-8">* * *</div>;
                    }
                    if (paragraph.trim() === '') return null;
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>

                <div className="mt-16 text-center font-mono text-[11px] text-[#c8a96e] opacity-35 uppercase tracking-widest">
                  &mdash; END OF TRANSMISSION &mdash;
                </div>

                <div className="mt-16 sm:mt-20 pt-6 border-t border-[rgba(200,169,110,0.15)] flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
                  {selectedPostIndex > 0 ? (
                    <button 
                      onClick={() => setSelectedPostId(ENTRIES[selectedPostIndex - 1].id)}
                      className="w-full sm:w-auto font-mono text-[10px] sm:text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter sm:text-left"
                    >
                      &larr; PREVIOUS ENTRY
                    </button>
                  ) : <div className="hidden sm:block"></div>}
                  
                  {selectedPostIndex < ENTRIES.length - 1 ? (
                    <button 
                      onClick={() => setSelectedPostId(ENTRIES[selectedPostIndex + 1].id)}
                      className="w-full sm:w-auto font-mono text-[10px] sm:text-[11px] text-[#c8a96e] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-tighter sm:text-right"
                    >
                      NEXT ENTRY &rarr;
                    </button>
                  ) : <div className="hidden sm:block"></div>}
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
