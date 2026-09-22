import React, { useState } from 'react';
import '@/styles/fonts.css';

import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/hero/Hero';
import { About } from '@/app/components/about/About';
import { Experience } from '@/app/components/experience/Experience';
import { Skills } from '@/app/components/skills/Skills';
import { ProjectTable } from '@/app/components/project/ProjectTable';
import { Qualifications } from '@/app/components/qualifications/Qualifications';
import { DigitalGarden } from '@/app/components/garden/DigitalGarden';
import { Contact } from '@/app/components/contact/Contact';
import { Footer } from '@/app/components/footer/Footer';
import { CommandPalette } from '@/app/components/command/CommandPalette';
import { ThreeDOverlay } from '@/app/components/overlay/ThreeDOverlay';

import { ENABLE_3D_SIMULATION, use3DMode } from '@/app/hooks/use3DMode';
import { useThemeVariables } from '@/app/hooks/useThemeVariables';
import { useAccessibility } from '@/app/context/AccessibilityContext';

const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useThemeVariables();

  const { theme, preferences } = useAccessibility();
  const { is3DMode, isLoading, toggle: toggle3DMode, disengage } = use3DMode();

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
        [data-high-contrast="true"] {
          --accent-glow: transparent;
        }
      `}</style>

      <CommandPalette open={isCommandOpen} setOpen={setIsCommandOpen} />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-main)] transition-colors duration-500" />
        {!preferences.highContrast && (
          <div
            className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.03] mix-blend-overlay' : 'opacity-[0.045] mix-blend-multiply'}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--grid-major-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-major-color) 1px, transparent 1px)`,
            backgroundSize: '200px 200px',
          }}
        />
        {theme === 'dark' && !preferences.highContrast ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80" />
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)' }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--accent-primary)] opacity-[0.03] blur-[120px]" />
          </>
        ) : !preferences.highContrast ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(245,243,239,0.72)_0%,transparent_42%,rgba(15,23,42,0.13)_100%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--accent-primary)] opacity-[0.12] blur-[120px]" />
          </>
        ) : null}
      </div>

      <div className="relative z-10">
        <Header
          is3DMode={is3DMode}
          toggle3DMode={toggle3DMode}
          openCommandPalette={() => setIsCommandOpen(true)}
        />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <ProjectTable />
          <Qualifications />
          <DigitalGarden />
          <Contact />
        </main>
        <Footer />
      </div>

      {ENABLE_3D_SIMULATION && (
        <ThreeDOverlay state={{ is3DMode, isLoading, disengage }} />
      )}
    </div>
  );
};

export default App;
