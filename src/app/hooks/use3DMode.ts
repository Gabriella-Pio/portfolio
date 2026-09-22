import { useState, useCallback } from 'react';

/** Set to true when the Three.js / R3F scene is ready to ship. */
export const ENABLE_3D_SIMULATION = false;

// ─────────────────────────────────────────────────────────────────────────────
// use3DMode
//
// FUTURE: flip ENABLE_3D_SIMULATION and replace the simulated loadEngine
// with real R3F initialization. Header / App already gate on the flag.
//
// Manages the lifecycle of the 3D simulation mode.
//
// CURRENT STATE:
//   Simulated — uses a setTimeout to mimic an async engine load.
//   When active, renders a placeholder overlay informing that Three.js
//   would be mounted here.
//
// HOW TO INTEGRATE THREE.JS (R3F):
//
//   1. Install dependencies:
//      npm install three @react-three/fiber @react-three/drei
//
//   2. Replace the `loadEngine` body below with actual initialization:
//
//      import { createRoot } from '@react-three/fiber'
//
//      const loadEngine = useCallback(async () => {
//        setIsLoading(true);
//        try {
//          // Pre-load heavy assets here (GLTFs, textures, etc.)
//          await preloadAssets();
//          setIs3DMode(true);
//        } catch (err) {
//          console.error('[3D] Engine failed to initialize', err);
//        } finally {
//          setIsLoading(false);
//        }
//      }, []);
//
//   3. In App.tsx (or a dedicated Scene.tsx), render the Canvas when is3DMode:
//
//      import { Canvas } from '@react-three/fiber'
//      import { OrbitControls, Environment } from '@react-three/drei'
//
//      {is3DMode && (
//        <Canvas className="fixed inset-0 z-[90]" camera={{ position: [0, 2, 8] }}>
//          <Environment preset="night" />
//          <OrbitControls />
//          <YourScene />
//        </Canvas>
//      )}
//
//   4. The `disengage` function already handles unmounting — it just sets
//      is3DMode to false, which removes the Canvas from the tree.
//      R3F handles WebGL context cleanup automatically on unmount.
// ─────────────────────────────────────────────────────────────────────────────

const ENGINE_LOAD_DURATION_MS = 2000;

export interface Use3DModeReturn {
  /** Whether the 3D environment is fully active */
  is3DMode: boolean;
  /** Whether the engine is currently loading (show progress overlay) */
  isLoading: boolean;
  /** Initiate the engine load sequence, then activate 3D mode */
  engage: () => void;
  /** Deactivate 3D mode and return to 2D documentation view */
  disengage: () => void;
  /** Toggle between modes — safe to bind directly to a button */
  toggle: () => void;
}

export function use3DMode(): Use3DModeReturn {
  const [is3DMode, setIs3DMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Simulated engine load ────────────────────────────────────────────────
  // Replace this function body with real Three.js / R3F initialization.
  // See the integration guide above.
  const loadEngine = useCallback((): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ENGINE_LOAD_DURATION_MS);
    });
  }, []);
  // ────────────────────────────────────────────────────────────────────────

  const engage = useCallback(async () => {
    if (is3DMode || isLoading) return;
    setIsLoading(true);
    try {
      await loadEngine();
      setIs3DMode(true);
    } finally {
      setIsLoading(false);
    }
  }, [is3DMode, isLoading, loadEngine]);

  const disengage = useCallback(() => {
    setIs3DMode(false);
    setIsLoading(false);
  }, []);

  const toggle = useCallback(() => {
    if (is3DMode) {
      disengage();
    } else {
      void engage();
    }
  }, [is3DMode, engage, disengage]);

  return { is3DMode, isLoading, engage, disengage, toggle };
}
