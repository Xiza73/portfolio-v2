import { motion } from 'motion/react';
import { type ReactNode } from 'react';

import { useReducedMotion } from '@/lib/use-reduced-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  duration?: number;
}

const directionMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  scale: { x: 0, y: 0 },
} as const;

function AnimatedSection({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const offset = directionMap[direction];
  const useScale = direction === 'scale';

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        ...(useScale && { scale: 0.8 }),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(useScale && { scale: 1 }),
      }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { AnimatedSection };
