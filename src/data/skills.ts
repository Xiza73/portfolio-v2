import { type Language } from '@/i18n/config';
import { getTranslation } from '@/i18n/utils';
import { type ProficiencyLevel, type SkillCategory } from '@/types/skill';

export const skillCategories: SkillCategory[] = [
  {
    title: 'FRONTEND',
    icon: 'globe',
    skills: ['React', 'Angular', 'Next.js', 'Tailwind CSS', 'Vue.js'],
  },
  {
    title: 'BACKEND',
    icon: 'server',
    skills: ['Node.js', 'Nest.js', 'Express', 'Spring Boot', 'GraphQL'],
  },
  {
    title: 'DATABASE',
    icon: 'database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase'],
  },
  {
    title: 'LANGUAGES',
    icon: 'code',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
  },
  {
    title: 'TOOLS',
    icon: 'wrench',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jira'],
  },
  {
    title: 'MOBILE',
    icon: 'smartphone',
    skills: ['React Native', 'PWA'],
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
  { id: 'database_mgmt', level: 85 },
];

export function getProficiencyLevels(lang: Language): ProficiencyLevel[] {
  const t = getTranslation(lang);
  const levels = t.skills.levels;

  return proficiencyData.map((item) => ({
    name: levels[item.id as keyof typeof levels] ?? item.id,
    level: item.level,
  }));
}
