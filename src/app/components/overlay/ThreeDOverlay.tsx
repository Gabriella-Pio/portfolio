import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { Use3DModeReturn } from '@/app/hooks/use3DMode';

interface ThreeDOverlayProps {
  state: Pick<Use3DModeReturn, 'is3DMode' | 'isLoading' | 'disengage'>;
}

// ─────────────────────────────────────────────────────────────────────────────
// ThreeDOverlay
//
// Renders the two animated overlays for 3D mode:
//   1. Loading overlay — shown while the engine initialises
//   2. Active overlay  — shown when 3D mode is on (currently a placeholder)
//
// THREE.JS INTEGRATION NOTE:
//   When the Canvas is implemented, the "Active" overlay below should be
//   REPLACED by (or rendered alongside) the R3F <Canvas> component.
//   Keep the loading overlay as-is — it works for real async loads too.
// ─────────────────────────────────────────────────────────────────────────────

export const ThreeDOverlay: React.FC<ThreeDOverlayProps> = ({ state }) => {
  const { is3DMode, isLoading, disengage } = state;

  return (
    <AnimatePresence>
      {/* ── Loading overlay ── */}
      {isLoading && (
        <motion.div
          key="loading"
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
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="h-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]"
              />
            </div>
            <div className="text-center text-[var(--text-secondary)] text-xs animate-pulse">
              LOADING_ASSETS...
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Active 3D overlay (placeholder — replace with <Canvas> when ready) ── */}
      {is3DMode && !isLoading && (
        <motion.div
          key="active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-[var(--bg-main)]/90 backdrop-blur-xl flex items-center justify-center p-8 text-center"
        >
          {/*
           * THREE.JS INTEGRATION POINT
           * ─────────────────────────
           * Replace this <div> block with your R3F <Canvas>:
           *
           * import { Canvas } from '@react-three/fiber'
           * import { OrbitControls, Environment } from '@react-three/drei'
           *
           * <Canvas className="absolute inset-0" camera={{ position: [0, 2, 8] }}>
           *   <Environment preset="night" />
           *   <OrbitControls />
           *   <YourScene />
           * </Canvas>
           *
           * Keep the DISENGAGE button below — mount it outside the Canvas
           * so it remains in the DOM layer.
           */}
          <div className="max-w-md border border-[var(--accent-primary)]/30 p-8 rounded-xl bg-[var(--bg-main)] relative overflow-hidden shadow-[0_0_50px_-20px_var(--accent-glow)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent" />
            <Loader2 className="animate-spin text-[var(--accent-primary)] mx-auto mb-4" size={32} />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">3D Environment Active</h2>
            <p className="text-[var(--text-secondary)] text-sm mb-6">
              In a real deployment, this would load the Three.js Canvas overlaying the DOM.
              <br /><br />
              Returning to 2D Documentation Mode...
            </p>
            <button
              onClick={disengage}
              className="px-4 py-2 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/50 rounded hover:bg-[var(--accent-primary)]/20 transition-colors text-sm font-mono shadow-[0_0_15px_-5px_var(--accent-glow)]"
            >
              DISENGAGE_SIMULATION
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
