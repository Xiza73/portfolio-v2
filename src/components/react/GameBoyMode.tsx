import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  applyGameBoyMode,
  dispatchGameBoyEvent,
  GAMEBOY_STORAGE_KEY,
} from '@/lib/gameboy-mode';
import { useKonamiCode } from '@/lib/use-konami-code';
import { useRapidClicks } from '@/lib/use-rapid-clicks';
import { useReducedMotion } from '@/lib/use-reduced-motion';

// Pre-compute particle directions for the pixel explosion
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * 360;
  const rad = (angle * Math.PI) / 180;
  const distance = 150 + Math.random() * 200;
  return {
    endX: Math.cos(rad) * distance,
    endY: Math.sin(rad) * distance,
  };
});

function TransitionOverlay() {
  useEffect(() => {
    document.documentElement.classList.add('gameboy-shake');
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('gameboy-shake');
    }, 400);
    return () => {
      clearTimeout(timeout);
      document.documentElement.classList.remove('gameboy-shake');
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-3 w-3 bg-primary sm:h-4 sm:w-4"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: p.endX,
            y: p.endY,
            opacity: 0,
            scale: [0, 1.5, 0.5],
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-[10000] -translate-x-1/2 border-4 border-primary bg-bg px-6 py-3 pixel-corner"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      <span className="pixel-text whitespace-nowrap text-xs text-primary">
        {message}
      </span>
    </motion.div>
  );
}

function GameBoyMode() {
  const [active, setActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showTransition, setShowTransition] = useState(false);
  const reduced = useReducedMotion();
  const initializedRef = useRef(false);

  // Initialize from localStorage on mount (no animation)
  useEffect(() => {
    const stored = localStorage.getItem(GAMEBOY_STORAGE_KEY) === 'on';
    if (stored) {
      setActive(true);
      applyGameBoyMode(true);
      dispatchGameBoyEvent(true);
      updateLogoText(true);
    }
    initializedRef.current = true;
  }, []);

  function updateLogoText(isActive: boolean) {
    const logoEl = document.querySelector('[data-logo-text]');
    if (logoEl) {
      logoEl.textContent = isActive ? 'XIZA.GB' : 'XIZA.EXE';
    }
  }

  const toggle = useCallback(() => {
    if (!initializedRef.current) return;

    setActive((prev) => {
      const next = !prev;
      const message = next ? 'RETRO BOOST ON' : 'RETRO BOOST OFF';

      if (!reduced) {
        // Start transition animation
        setShowTransition(true);

        // Apply theme change mid-animation (masked by explosion)
        setTimeout(() => {
          applyGameBoyMode(next);
          dispatchGameBoyEvent(next);
          updateLogoText(next);
          localStorage.setItem(GAMEBOY_STORAGE_KEY, next ? 'on' : 'off');
        }, 300);

        setTimeout(() => setShowTransition(false), 800);
      } else {
        // Immediate change for reduced motion
        applyGameBoyMode(next);
        dispatchGameBoyEvent(next);
        updateLogoText(next);
        localStorage.setItem(GAMEBOY_STORAGE_KEY, next ? 'on' : 'off');
      }

      // Show toast
      setToastMessage(message);
      setTimeout(() => setToastMessage(null), 2500);

      return next;
    });
  }, [reduced]);

  useKonamiCode(toggle);
  useRapidClicks('[data-pixel-character]', 5, 3000, toggle);

  return (
    <>
      <AnimatePresence>
        {showTransition && <TransitionOverlay />}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && <Toast message={toastMessage} />}
      </AnimatePresence>
    </>
  );
}

export { GameBoyMode };
