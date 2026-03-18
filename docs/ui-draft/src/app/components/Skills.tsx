import { motion } from 'motion/react';
import { Code2, Database, Globe, Server, Smartphone, Wrench } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'FRONTEND',
    icon: <Globe size={24} />,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
  },
  {
    title: 'BACKEND',
    icon: <Server size={24} />,
    skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL'],
  },
  {
    title: 'DATABASE',
    icon: <Database size={24} />,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Firebase'],
  },
  {
    title: 'MOBILE',
    icon: <Smartphone size={24} />,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'PWA'],
  },
  {
    title: 'LANGUAGES',
    icon: <Code2 size={24} />,
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'],
  },
  {
    title: 'TOOLS',
    icon: <Wrench size={24} />,
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Kubernetes'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-2 bg-[#FFD700] pixel-corner mb-4">
            <span className="pixel-text text-[#000000] text-sm">SKILLS.SYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#FFD700] pixel-text">TECH_STACK</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-4 border-[#FFD700] pixel-corner p-6 hover:border-[#00FFFF] transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FFD700] pixel-corner flex items-center justify-center group-hover:bg-[#00FFFF] transition-colors">
                  <span className="text-[#000000]">{category.icon}</span>
                </div>
                <h3 className="text-xl text-[#FFD700] pixel-text group-hover:text-[#00FFFF] transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FFD700] group-hover:bg-[#00FFFF] transition-colors" />
                    <span className="text-[#FFFFFF] pixel-text text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Progress Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 border-4 border-[#FFD700] pixel-corner p-6"
        >
          <h3 className="text-2xl text-[#FFD700] pixel-text mb-6">PROFICIENCY_LEVELS</h3>
          
          <div className="space-y-4">
            {[
              { name: 'FULL_STACK_DEV', level: 90 },
              { name: 'FRONT_END', level: 95 },
              { name: 'BACK_END', level: 85 },
              { name: 'DATABASE_MGMT', level: 80 },
            ].map((item, index) => (
              <div key={item.name}>
                <div className="flex justify-between mb-2">
                  <span className="pixel-text text-[#FFD700] text-sm">{item.name}</span>
                  <span className="pixel-text text-[#00FFFF] text-sm">{item.level}%</span>
                </div>
                <div className="h-4 bg-[#1a1a1a] border-2 border-[#FFD700]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-[#FFD700]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
