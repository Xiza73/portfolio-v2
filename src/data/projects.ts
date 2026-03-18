import { type Language } from '@/i18n/config';
import { getTranslation } from '@/i18n/utils';
import { type GithubRepo, type Project } from '@/types/project';

interface ProjectGithubData {
  labelKey: string;
  url: string;
}

interface ProjectData {
  id: string;
  title: string;
  tech: string[];
  github: ProjectGithubData[];
  demo?: string;
}

const projectsData: ProjectData[] = [
  {
    id: 'habit_summaq',
    title: 'HABIT_SUMMAQ.APP',
    tech: ['React', 'Next.js', 'Node.js', 'Nest.js', 'PostgreSQL', 'Redis'],
    github: [
      { labelKey: 'front', url: 'https://github.com/Xiza73/habit-sumaq-web' },
      { labelKey: 'back', url: 'https://github.com/Xiza73/habit-sumaq-backend' },
    ],
    demo: 'https://habit-sumaq-web.vercel.app',
  },
  {
    id: 'discord_bot',
    title: 'DISCORD_BOT.EXE',
    tech: ['TypeScript', 'Discord.js', 'Node.js', 'MongoDB'],
    github: [{ labelKey: 'code', url: 'https://github.com/Xiza73/BotitoV2' }],
  },
  {
    id: 'real_time_chat',
    title: 'REAL_TIME_CHAT.BAT',
    tech: ['React', 'Next.js', 'Supabase', 'Supabase Realtime'],
    github: [{ labelKey: 'code', url: 'https://github.com/Xiza73/realtime-chat' }],
  },
  {
    id: 'water_reminder_extension',
    title: 'WATER_REMINDER_EXTENSION.CRX',
    tech: ['React', 'TypeScript', 'Chrome Extensions API'],
    github: [{ labelKey: 'code', url: 'https://github.com/Xiza73/water-reminder-extension' }],
  },
];

export function getProjects(lang: Language): Project[] {
  const t = getTranslation(lang);
  const items = t.projects.items;
  const repoLabels = t.projects.repo_labels;

  return projectsData.map((project) => {
    const itemTranslation = items[project.id as keyof typeof items];

    const github: GithubRepo[] = project.github.map((repo) => ({
      label: repoLabels[repo.labelKey as keyof typeof repoLabels] ?? repo.labelKey,
      url: repo.url,
    }));

    return {
      title: project.title,
      description: itemTranslation?.description ?? '',
      tech: project.tech,
      github,
      demo: project.demo,
    };
  });
}
