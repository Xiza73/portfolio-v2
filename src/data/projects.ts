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
    id: 'ecommerce',
    title: 'E-COMMERCE.APP',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: [
      { labelKey: 'front', url: 'https://github.com' },
      { labelKey: 'back', url: 'https://github.com' },
    ],
    demo: 'https://demo.com',
  },
  {
    id: 'task_manager',
    title: 'TASK_MANAGER.SYS',
    tech: ['TypeScript', 'Next.js', 'MongoDB', 'WebSocket'],
    github: [
      { labelKey: 'front', url: 'https://github.com' },
      { labelKey: 'back', url: 'https://github.com' },
    ],
    demo: 'https://demo.com',
  },
  {
    id: 'ai_chatbot',
    title: 'AI_CHATBOT.EXE',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    github: [{ labelKey: 'code', url: 'https://github.com' }],
  },
  {
    id: 'analytics',
    title: 'ANALYTICS.DASH',
    tech: ['Vue.js', 'D3.js', 'Express', 'MySQL'],
    github: [{ labelKey: 'code', url: 'https://github.com' }],
    demo: 'https://demo.com',
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
