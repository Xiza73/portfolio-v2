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

export const proficiencyLevels: ProficiencyLevel[] = [
  { name: 'FULL_STACK_DEV', level: 90 },
  { name: 'FRONT_END', level: 95 },
  { name: 'BACK_END', level: 85 },
  { name: 'DATABASE_MGMT', level: 80 },
];
