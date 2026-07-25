import React, { useState, useEffect, useMemo } from 'react';
import '@/styles/fonts.css';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { ProjectTable } from '@/app/components/ProjectTable';
import { DigitalGarden } from '@/app/components/DigitalGarden';
import { Footer } from '@/app/components/Footer';
import { CommandPalette } from '@/app/components/CommandPalette';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { useAccessibility } from '@/app/context/AccessibilityContext';

const App: React.FC = () => {
  const [is3DMode, setIs3DMode] = useState(false);
  const [isLoading3D, setIsLoading3D] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const { theme, preferences, toggleTheme } = useAccessibility();

  const toggle3DMode = () => {
    if (is3DMode) {
      setIs3DMode(false);
    } else {
      setIsLoading3D(true);
      setTimeout(() => {
        setIsLoading3D(false);
        setIs3DMode(true);
      }, 2000);
    }
  };

  // CSS Variables based on theme
  const themeStyles = useMemo(() => ({
    '--bg-main': theme === 'dark' ? '#0B0C15' : '#F4F6F8',
    '--bg-surface': theme === 'dark' ? '#151621' : '#FFFFFF',
    '--border-color': theme === 'dark' ? '#2D2E3A' : '#E2E8F0',
    '--text-primary': theme === 'dark' ? '#FFFFFF' : '#0F172A',
    '--text-secondary': theme === 'dark' ? '#9CA3AF' : '#64748B',
    '--accent-primary': theme === 'dark' ? '#00F0FF' : '#0055FF',
    '--accent-secondary': theme === 'dark' ? '#00FF94' : '#10B981',
    '--accent-glow': theme === 'dark' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 85, 255, 0.15)',
    '--grid-color': theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(15, 23, 42, 0.04)',
    '--grid-major-color': theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15, 23, 42, 0.08)',
    '--vignette-color': theme === 'dark' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,0)',
  }), [theme]);

  const contrastStyles = useMemo(() => preferences.highContrast ? ({
    '--bg-main': theme === 'dark' ? '#000000' : '#FFFFFF',
    '--bg-surface': theme === 'dark' ? '#111111' : '#F8FAFC',
    '--border-color': theme === 'dark' ? '#FFFFFF' : '#0F172A',
    '--text-primary': theme === 'dark' ? '#FFFFFF' : '#0F172A',
    '--text-secondary': theme === 'dark' ? '#E5E7EB' : '#334155',
    '--accent-primary': theme === 'dark' ? '#FFD166' : '#0F172A',
    '--accent-secondary': theme === 'dark' ? '#7DD3FC' : '#0F172A',
    '--accent-glow': theme === 'dark' ? 'rgba(255, 209, 102, 0.35)' : 'rgba(15, 23, 42, 0.2)',
    '--grid-color': theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(15, 23, 42, 0.1)',
    '--grid-major-color': theme === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(15, 23, 42, 0.18)',
  }) : {}, [theme, preferences.highContrast]);

  const rootStyles = useMemo(() => ({
    ...themeStyles,
    ...contrastStyles,
    '--app-font-scale': preferences.fontScale.toString(),
  } as Record<string, string>), [themeStyles, contrastStyles, preferences.fontScale]);

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(rootStyles).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.style.fontSize = `${preferences.fontScale}rem`;
  }, [rootStyles, preferences.fontScale]);

  return (
    <div 
      className="min-h-screen font-sans selection:bg-[var(--accent-primary)]/30 overflow-x-hidden transition-colors duration-500"
      data-reduce-motion={preferences.reduceMotion ? 'true' : 'false'}
      data-simplified={preferences.simplifiedMode ? 'true' : 'false'}
      data-high-contrast={preferences.highContrast ? 'true' : 'false'}
      data-keyboard-focus={preferences.keyboardFocus ? 'true' : 'false'}
    >
      <style>{`
        body {
          background-color: var(--bg-main);
          color: var(--text-primary);
        }
        [data-reduce-motion="true"] * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        [data-simplified="true"] [data-decorative="true"] {
          display: none !important;
        }
        [data-keyboard-focus="true"] *:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--bg-main), 0 0 0 4px var(--accent-primary);
        }
      `}</style>

      <CommandPalette open={isCommandOpen} setOpen={setIsCommandOpen} />

      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Layer 1: Base & Grain */}
        <div className="absolute inset-0 bg-[var(--bg-main)] transition-colors duration-500" />
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Layer 2: Technical Grid (Minor) */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Layer 3: Technical Grid (Major - Every 5th line = 200px) */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--grid-major-color) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid-major-color) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Layer 4: Vignette (Focus Effect) */}
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80" />
        )}
        
        {/* Layer 5: Scanlines (Subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
             style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)' }} 
        />
        
        {/* Layer 6: Radial Glow (Accent) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--accent-primary)] opacity-[0.03] blur-[120px]" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10">
        <Header 
          is3DMode={is3DMode} 
          toggle3DMode={toggle3DMode} 
          openCommandPalette={() => setIsCommandOpen(true)}
        />
        
        <main>
          <Hero />
          <ProjectTable />
          <DigitalGarden />
        </main>
        
        <Footer />
      </div>

      {/* 3D Loading Overlay */}
      <AnimatePresence>
        {isLoading3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-main)] flex flex-col items-center justify-center font-mono"
          >
            <div className="w-64 space-y-4">
              <div className="flex justify-between text-xs text-[var(--accent-primary)]">
                <span>INITIALIZING_ENGINE</span>
                <span>[R3F]</span>
              </div>
              <div className="h-1 w-full bg-[var(--bg-surface)] rounded overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]"
                />
              </div>
              <div className="text-center text-[var(--text-secondary)] text-xs animate-pulse">
                LOADING_ASSETS...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Simulated" 3D Mode Overlay */}
      <AnimatePresence>
        {is3DMode && !isLoading3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0

              z-[90]

              bg-[var(--bg-main)]/90
              backdrop-blur-xl

              flex
              items-center
              justify-center

              p-8
              text-center
              "
          >
            <div className="max-w-md border border-[var(--accent-primary)]/30 p-8 rounded-xl bg-[var(--bg-main)] relative overflow-hidden shadow-[0_0_50px_-20px_var(--accent-glow)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent"></div>
              <Loader2 className="animate-spin text-[var(--accent-primary)] mx-auto mb-4" size={32} />
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">3D Environment Active</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                In a real deployment, this would load the Three.js Canvas overlaying the DOM.
                <br/><br/>
                Returning to 2D Documentation Mode...
              </p>
              <button 
                onClick={() => setIs3DMode(false)}
                className="px-4 py-2 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/50 rounded hover:bg-[var(--accent-primary)]/20 transition-colors text-sm font-mono shadow-[0_0_15px_-5px_var(--accent-glow)]"
              >
                DISENGAGE_SIMULATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
