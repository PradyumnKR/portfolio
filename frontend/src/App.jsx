import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScanlineOverlay from './components/ScanlineOverlay';
import CustomCursor from './components/CustomCursor';
import MusicToggle from './components/MusicToggle';
import TypewriterSound from './components/TypewriterSound';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import CursorTrail from './components/CursorTrail';
import IdleDetector from './components/IdleDetector';
import HiddenTerminal from './components/HiddenTerminal';
import KonamiCode from './components/KonamiCode';

// Import Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import CaseStudy from './pages/CaseStudy';
import FieldNotes from './pages/FieldNotes';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative flex min-h-screen w-full flex-col font-mono bg-espresso text-parchment selection:bg-gold/30 selection:text-white overflow-x-hidden">
      <ScrollToTop />
      <CursorTrail />
      <IdleDetector />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loading" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      <CustomCursor />
      <TypewriterSound />
      <MusicToggle />
      <ScanlineOverlay />
      <HiddenTerminal />
      <KonamiCode />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects/:id" element={<CaseStudy />} />
          <Route path="/journal" element={<FieldNotes />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
