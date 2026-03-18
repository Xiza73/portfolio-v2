export interface SkillCategory {
  title: string;
  icon: 'globe' | 'server' | 'database' | 'smartphone' | 'code' | 'wrench';
  skills: string[];
}

export interface ProficiencyLevel {
  name: string;
  level: number;
}
