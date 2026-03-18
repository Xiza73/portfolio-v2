import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#FFD700] pixel-corner">
              <span className="pixel-text text-[#000000] text-sm">HELLO_WORLD.EXE</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#FFD700] pixel-text leading-tight">
              SOFTWARE
              <br />
              ENGINEER
            </h1>
            
            <p className="text-[#00FFFF] pixel-text text-sm sm:text-base leading-relaxed">
              Crafting digital experiences with clean code and pixel-perfect precision.
              Specializing in full-stack development with a passion for creating
              innovative solutions.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#FFD700] pixel-corner flex items-center justify-center hover:bg-[#00FFFF] transition-colors group"
                aria-label="GitHub"
              >
                <Github className="text-[#000000]" size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#FFD700] pixel-corner flex items-center justify-center hover:bg-[#00FFFF] transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="text-[#000000]" size={24} />
              </a>
              <a
                href="mailto:developer@example.com"
                className="w-12 h-12 bg-[#FFD700] pixel-corner flex items-center justify-center hover:bg-[#00FFFF] transition-colors group"
                aria-label="Email"
              >
                <Mail className="text-[#000000]" size={24} />
              </a>
            </div>

            <a
              href="#projects"
              className="inline-block px-8 py-4 bg-[#FFD700] pixel-corner hover:bg-[#00FFFF] transition-colors group"
            >
              <span className="pixel-text text-[#000000]">VIEW_PROJECTS</span>
            </a>
          </motion.div>

          {/* Right Column - Pixel Art Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Animated Dots */}
              <motion.div
                animate={{ x: [0, 20, 40, 60, 80] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -left-24 top-1/2 flex gap-4"
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-[#FFD700] rounded-full" />
                ))}
              </motion.div>

              {/* Main Character Box */}
              <div className="w-64 h-64 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-4 border-[#FFD700] pixel-corner p-8 relative">
                {/* Pixel Character */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1">
                    {/* Simple pixel art pattern */}
                    {[
                      [0,0,1,1,1,1,0,0],
                      [0,1,1,1,1,1,1,0],
                      [1,1,0,1,1,0,1,1],
                      [1,1,1,1,1,1,1,1],
                      [1,1,1,1,1,1,1,1],
                      [0,1,1,1,1,1,1,0],
                      [0,0,1,0,0,1,0,0],
                      [0,1,0,0,0,0,1,0],
                    ].map((row, i) => (
                      row.map((cell, j) => (
                        <div
                          key={`${i}-${j}`}
                          className={`w-3 h-3 ${cell ? 'bg-[#FFD700]' : 'bg-transparent'}`}
                        />
                      ))
                    ))}
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00FFFF]" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00FFFF]" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#00FFFF]" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#00FFFF]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
