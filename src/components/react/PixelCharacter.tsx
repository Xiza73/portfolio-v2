import { motion, useAnimationFrame } from 'motion/react';
import { useState } from 'react';

import { useGameBoyMode } from '@/lib/use-gameboy-mode';
import { useReducedMotion } from '@/lib/use-reduced-motion';

// Pac-Man with mouth open (13x13 grid)
const PACMAN_OPEN = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
];

// Pac-Man with mouth closed (13x13 grid)
const PACMAN_CLOSED = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
];

// Game Boy console — front view (13x13 grid)
// 0 = transparent, 1 = primary (body), 2 = bg (screen), 3 = accent (buttons)
const GAMEBOY_CONSOLE = [
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0],
  [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0],
  [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0],
  [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0],
  [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 0],
  [0, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 0],
  [0, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
];

const CELL_COLORS: Record<number, string> = {
  0: 'bg-transparent',
  1: 'bg-primary',
  2: 'bg-bg',
  3: 'bg-accent',
};

function PixelGrid({ grid }: { grid: number[][] }) {
  return (
    <div className="grid grid-cols-[repeat(13,1fr)] gap-0.5">
      {grid.flat().map((cell, i) => (
        <div
          key={i}
          className={`aspect-square w-1.5 sm:w-2 md:w-2.5 ${CELL_COLORS[cell] ?? 'bg-transparent'}`}
        />
      ))}
    </div>
  );
}

function PixelCharacter() {
  const [mouthOpen, setMouthOpen] = useState(true);
  const reduced = useReducedMotion();
  const isGameBoy = useGameBoyMode();

  useAnimationFrame((time) => {
    if (reduced || isGameBoy) return;
    const shouldBeOpen = Math.floor(time / 250) % 2 === 0;
    setMouthOpen(shouldBeOpen);
  });

  const currentGrid = isGameBoy
    ? GAMEBOY_CONSOLE
    : reduced
      ? PACMAN_OPEN
      : mouthOpen
        ? PACMAN_OPEN
        : PACMAN_CLOSED;

  const containerProps = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.6, delay: 0.2 },
      };

  return (
    <motion.div {...containerProps} className="flex justify-center">
      <div className="relative" data-pixel-character>
        {/* Pac-dots infinite carousel (normal mode) */}
        {!isGameBoy && !reduced && (
          <div className="absolute left-full top-1/2 ml-2 w-24 -translate-y-1/2 overflow-hidden sm:ml-3 sm:w-32 md:ml-4 md:w-40">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="flex w-max"
            >
              {[0, 1].map((set) => (
                <div
                  key={set}
                  className="flex items-center gap-4 pr-4 sm:gap-5 sm:pr-5 md:gap-6 md:pr-6"
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-2 w-2 shrink-0 rounded-full bg-primary sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Static dots for reduced motion (normal mode) */}
        {!isGameBoy && reduced && (
          <div className="absolute left-full top-1/2 ml-2 flex -translate-y-1/2 gap-4 sm:ml-3 sm:gap-5 md:ml-4 md:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-primary sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
              />
            ))}
          </div>
        )}

        {/* Link cable (retro mode) */}
        {isGameBoy && (
          <div className="absolute left-full top-1/2 ml-0 flex -translate-y-1/2 items-center">
            {/* Cable line */}
            <div className="h-1 w-16 bg-primary sm:w-24 md:w-32" />
            {/* Connector plug */}
            <div className="h-3 w-2 border-2 border-primary bg-bg sm:h-4 sm:w-3" />
          </div>
        )}

        {/* Main character box */}
        <div className="relative border-4 border-primary bg-linear-to-br from-bg-subtle to-bg p-4 pixel-corner sm:p-6 md:p-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <PixelGrid grid={currentGrid} />
          </div>

          <div className="invisible">
            <PixelGrid grid={PACMAN_OPEN} />
          </div>

          {/* Corner decorations */}
          <div className="absolute -left-2 -top-2 h-3 w-3 bg-accent sm:h-4 sm:w-4" />
          <div className="absolute -right-2 -top-2 h-3 w-3 bg-accent sm:h-4 sm:w-4" />
          <div className="absolute -bottom-2 -left-2 h-3 w-3 bg-accent sm:h-4 sm:w-4" />
          <div className="absolute -bottom-2 -right-2 h-3 w-3 bg-accent sm:h-4 sm:w-4" />
        </div>
      </div>
    </motion.div>
  );
}

export { PixelCharacter };
