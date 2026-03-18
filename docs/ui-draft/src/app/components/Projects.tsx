import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'E-COMMERCE.APP',
    description: 'Full-stack e-commerce platform with real-time inventory management and payment integration.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    title: 'TASK_MANAGER.SYS',
    description: 'Collaborative task management system with real-time updates and team analytics.',
    tech: ['TypeScript', 'Next.js', 'MongoDB', 'WebSocket'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    title: 'AI_CHATBOT.EXE',
    description: 'Intelligent chatbot using natural language processing for customer support automation.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    github: 'https://github.com',
  },
  {
    title: 'ANALYTICS.DASH',
    description: 'Real-time analytics dashboard with data visualization and reporting features.',
    tech: ['Vue.js', 'D3.js', 'Express', 'MySQL'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

export function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-2 bg-[#FFD700] pixel-corner mb-4">
            <span className="pixel-text text-[#000000] text-sm">PROJECTS.DIR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#FFD700] pixel-text">RECENT_WORK</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#0a0a0a] border-4 border-[#FFD700] pixel-corner p-6 hover:border-[#00FFFF] transition-colors group"
            >
              <h3 className="text-xl text-[#FFD700] pixel-text mb-3 group-hover:text-[#00FFFF] transition-colors">
                {project.title}
              </h3>
              
              <p className="text-[#FFFFFF] pixel-text text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#1a1a1a] border-2 border-[#FFD700] pixel-text text-[#FFD700] text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#FFD700] hover:text-[#00FFFF] transition-colors pixel-text text-sm"
                  >
                    <Github size={16} />
                    CODE
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#FFD700] hover:text-[#00FFFF] transition-colors pixel-text text-sm"
                  >
                    <ExternalLink size={16} />
                    DEMO
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
