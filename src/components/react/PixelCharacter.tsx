import { motion, useAnimationFrame } from 'motion/react';
import { useState } from 'react';

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

function PacManGrid({ grid }: { grid: number[][] }) {
  return (
    <div className="grid grid-cols-[repeat(13,1fr)] gap-0.5">
      {grid.flat().map((cell, i) => (
        <div
          key={i}
          className={`aspect-square w-1.5 sm:w-2 md:w-2.5 ${
            cell === 1
              ? 'bg-primary'
              : cell === 2
                ? 'bg-bg'
                : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}

function PixelCharacter() {
  const [mouthOpen, setMouthOpen] = useState(true);

  // Toggle mouth every 250ms using animation frame for crisp swap
  useAnimationFrame((time) => {
    const shouldBeOpen = Math.floor(time / 250) % 2 === 0;
    setMouthOpen(shouldBeOpen);
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center"
    >
      <div className="relative">
        {/* Pac-dots infinite carousel */}
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

        {/* Main character box */}
        <div className="relative border-4 border-primary bg-linear-to-br from-bg-subtle to-bg p-4 pixel-corner sm:p-6 md:p-8">
          {/* Pac-Man with crisp frame swap */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PacManGrid grid={mouthOpen ? PACMAN_OPEN : PACMAN_CLOSED} />
          </div>

          {/* Invisible spacer to maintain box size */}
          <div className="invisible">
            <PacManGrid grid={PACMAN_OPEN} />
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
