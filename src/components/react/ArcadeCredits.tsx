import { motion } from 'motion/react';
import { useEffect } from 'react';

const CREDITS = [
  { type: 'title', text: '- CREDITS -' },
  { type: 'spacer' },
  { type: 'heading', text: 'DEVELOPED BY' },
  { type: 'name', text: 'MANUEL FAJARDO' },
  { type: 'role', text: '— XIZA —' },
  { type: 'spacer' },
  { type: 'heading', text: 'DESIGN' },
  { type: 'name', text: 'PIXEL ART DIRECTION' },
  { type: 'role', text: 'XIZA' },
  { type: 'spacer' },
  { type: 'heading', text: 'POWERED BY' },
  { type: 'name', text: 'ASTRO' },
  { type: 'name', text: 'REACT' },
  { type: 'name', text: 'TAILWIND CSS' },
  { type: 'name', text: 'TYPESCRIPT' },
  { type: 'name', text: 'MOTION' },
  { type: 'spacer' },
  { type: 'heading', text: 'FONT' },
  { type: 'name', text: 'PRESS START 2P' },
  { type: 'role', text: 'BY CODEMAN38' },
  { type: 'spacer' },
  { type: 'heading', text: 'SPECIAL THANKS' },
  { type: 'name', text: 'COFFEE' },
  { type: 'name', text: 'LATE NIGHTS' },
  { type: 'name', text: 'PIXEL ART COMMUNITY' },
  { type: 'name', text: 'AND YOU!' },
  { type: 'spacer' },
  { type: 'spacer' },
  { type: 'title', text: 'THANK YOU' },
  { type: 'title', text: 'FOR PLAYING' },
  { type: 'spacer' },
  { type: 'role', text: '2024-2026' },
] as const;

// Total scroll height based on items: ~(items * 40px + viewport)
// Duration proportional to content length for steady scroll speed
const SCROLL_DURATION = CREDITS.length * 0.8;

function ArcadeCredits({ onClose }: { onClose: () => void }) {
  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-bg/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      style={{ isolation: 'isolate' }}
    >
      {/* Scrolling container */}
      <div className="relative h-full w-full max-w-md overflow-hidden">
        {/* Top/bottom fade gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-bg to-transparent" />

        {/* Credits that scroll upward */}
        <motion.div
          className="flex flex-col items-center gap-1 px-4 pt-[100vh]"
          initial={{ y: 0 }}
          animate={{ y: -(CREDITS.length * 48 + window.innerHeight) }}
          transition={{
            duration: SCROLL_DURATION,
            ease: 'linear',
          }}
          onAnimationComplete={onClose}
        >
          {CREDITS.map((item, i) => {
            if (item.type === 'spacer') {
              return <div key={i} className="h-10" />;
            }

            const styles = {
              title: 'pixel-text text-sm text-primary sm:text-base md:text-lg',
              heading: 'pixel-text text-[10px] text-accent sm:text-xs',
              name: 'pixel-text text-xs text-primary sm:text-sm',
              role: 'pixel-text text-[10px] text-primary/60 sm:text-xs',
            } as const;

            return (
              <p key={i} className={`text-center ${styles[item.type]}`}>
                {item.text}
              </p>
            );
          })}
        </motion.div>
      </div>

      {/* Hint */}
      <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 pixel-text text-[7px] text-primary/40 sm:text-[8px]">
        CLICK OR ESC TO CLOSE
      </span>
    </motion.div>
  );
}

export { ArcadeCredits };
