import { type Language } from '@/i18n/config';
import { getTranslation } from '@/i18n/utils';
import { type Project } from '@/types/project';

interface ProjectData {
  id: string;
  title: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const projectsData: ProjectData[] = [
  {
    id: 'ecommerce',
    title: 'E-COMMERCE.APP',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 'task_manager',
    title: 'TASK_MANAGER.SYS',
    tech: ['TypeScript', 'Next.js', 'MongoDB', 'WebSocket'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 'ai_chatbot',
    title: 'AI_CHATBOT.EXE',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    github: 'https://github.com',
  },
  {
    id: 'analytics',
    title: 'ANALYTICS.DASH',
    tech: ['Vue.js', 'D3.js', 'Express', 'MySQL'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

export function getProjects(lang: Language): Project[] {
  const t = getTranslation(lang);
  const items = t.projects.items;

  return projectsData.map((project) => {
    const itemTranslation = items[project.id as keyof typeof items];

    return {
      title: project.title,
      description: itemTranslation?.description ?? '',
      tech: project.tech,
      github: project.github,
      demo: project.demo,
    };
  });
}
