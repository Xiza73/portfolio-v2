import { AnimatedSection } from '@/components/react/AnimatedSection';
import { SkillProgressBar } from '@/components/react/SkillProgressBar';
import { getProficiencyLevels, skillCategories } from '@/data/skills';
import { useTranslation } from '@/hooks/useTranslation';
import { type SkillCategory } from '@/types/skill';

const iconPaths: Record<SkillCategory['icon'], string> = {
  globe:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  server: 'M2 4h20v5H2zM2 15h20v5H2zM6 7h.01M6 18h.01',
  database:
    'M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zM2 6.5C2 8.98 6.48 11 12 11s10-2.02 10-4.5M2 12c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5',
  smartphone:
    'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  wrench:
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
};

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="h-full border-4 border-primary p-4 transition-colors hover:border-accent sm:p-5 md:p-6 pixel-corner group">
      <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
        <div className="flex h-9 w-9 items-center justify-center bg-primary transition-colors group-hover:bg-accent pixel-corner sm:h-10 sm:w-10 md:h-12 md:w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-dark sm:h-5 sm:w-5 md:h-6 md:w-6"
          >
            <path d={iconPaths[category.icon]} />
          </svg>
        </div>
        <h3 className="pixel-text text-[10px] text-primary transition-colors group-hover:text-accent sm:text-xs md:text-sm">
          {category.title}
        </h3>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        {category.skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-primary transition-colors group-hover:bg-accent sm:h-2 sm:w-2" />
            <span className="pixel-text text-[9px] text-text sm:text-[10px] md:text-xs">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  const { t, lang } = useTranslation();
  const proficiencyLevels = getProficiencyLevels(lang);

  return (
    <section id="skills" className="bg-bg-surface py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="mb-3 inline-block bg-primary px-3 py-1.5 pixel-corner sm:mb-4 sm:px-4 sm:py-2">
              <span className="pixel-text text-[10px] text-text-dark sm:text-xs md:text-sm">
                {t.skills.tag}
              </span>
            </div>
            <h2 className="pixel-text text-sm text-primary sm:text-xl md:text-2xl lg:text-3xl">
              {t.skills.title}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {skillCategories.map((category, index) => (
            <AnimatedSection
              key={category.title}
              direction="scale"
              delay={index * 0.1}
              className="h-full"
            >
              <SkillCard category={category} />
            </AnimatedSection>
          ))}
        </div>

        {/* Proficiency Levels */}
        <AnimatedSection delay={0.4} className="mt-12 sm:mt-16">
          <div className="border-4 border-primary p-4 sm:p-5 md:p-6 pixel-corner">
            <h3 className="pixel-text mb-4 text-xs text-primary sm:mb-6 sm:text-sm md:text-base">
              {t.skills.proficiency}
            </h3>
            <SkillProgressBar levels={proficiencyLevels} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export { SkillsSection };
