import { motion } from 'motion/react';

import { type ProficiencyLevel } from '@/types/skill';

interface SkillProgressBarProps {
  levels: ProficiencyLevel[];
}

function SkillProgressBar({ levels }: SkillProgressBarProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {levels.map((item, index) => (
        <div key={item.name}>
          <div className="mb-1.5 flex justify-between sm:mb-2">
            <span className="pixel-text text-[9px] text-primary sm:text-[10px] md:text-xs">
              {item.name}
            </span>
            <span className="pixel-text text-[9px] text-accent sm:text-[10px] md:text-xs">
              {item.level}%
            </span>
          </div>
          <div className="h-3 border-2 border-primary bg-bg-subtle sm:h-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export { SkillProgressBar };
