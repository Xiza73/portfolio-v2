import { type Language } from '@/i18n/config';
import { getTranslation } from '@/i18n/utils';
import { type ProficiencyLevel, type SkillCategory } from '@/types/skill';

export const skillCategories: SkillCategory[] = [
  {
    title: 'FRONTEND',
    icon: 'globe',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
  },
  {
    title: 'BACKEND',
    icon: 'server',
    skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL'],
  },
  {
    title: 'DATABASE',
    icon: 'database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'],
  },
  {
    title: 'MOBILE',
    icon: 'smartphone',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'PWA'],
  },
  {
    title: 'LANGUAGES',
    icon: 'code',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'],
  },
  {
    title: 'TOOLS',
    icon: 'wrench',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Kubernetes'],
  },
];

interface ProficiencyData {
  id: string;
  level: number;
}

const proficiencyData: ProficiencyData[] = [
  { id: 'full_stack_dev', level: 90 },
  { id: 'front_end', level: 95 },
  { id: 'back_end', level: 85 },
  { id: 'database_mgmt', level: 80 },
];

export function getProficiencyLevels(lang: Language): ProficiencyLevel[] {
  const t = getTranslation(lang);
  const levels = t.skills.levels;

  return proficiencyData.map((item) => ({
    name: levels[item.id as keyof typeof levels] ?? item.id,
    level: item.level,
  }));
}
