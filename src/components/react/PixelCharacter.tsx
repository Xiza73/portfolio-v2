import { motion } from 'motion/react';

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center"
    >
      <div className="relative">
        {/* Pac-dots being eaten */}
        <div className="absolute -right-15 top-1/2 -translate-y-1/2 flex gap-3 sm:-right-20 sm:gap-4 md:-right-25 md:gap-5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [1, 1, 0, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'steps(1)',
              }}
              className="h-2 w-2 rounded-full bg-primary sm:h-2.5 sm:w-2.5 md:h-3 md:w-3"
            />
          ))}
        </div>

        {/* Main character box */}
        <div className="relative border-4 border-primary bg-linear-to-br from-bg-subtle to-bg p-4 pixel-corner sm:p-6 md:p-8">
          {/* Pac-Man with mouth animation */}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PacManGrid grid={PACMAN_OPEN} />
          </motion.div>
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PacManGrid grid={PACMAN_CLOSED} />
          </motion.div>

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
