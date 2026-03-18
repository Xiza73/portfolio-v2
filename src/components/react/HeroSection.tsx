import { AnimatedSection } from '@/components/react/AnimatedSection';
import { PixelCharacter } from '@/components/react/PixelCharacter';
import { socialLinks } from '@/data/social-links';
import { useTranslation } from '@/hooks/useTranslation';

const iconPaths: Record<string, string> = {
  github:
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2',
  linkedin:
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
};

function HeroSection() {
  const { t } = useTranslation();
  const hero = t.hero;

  return (
    <section
      id="about"
      className="flex min-h-screen items-center justify-center overflow-x-clip px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-12">
          {/* Left Column - Text */}
          <AnimatedSection direction="left">
            <div className="space-y-4 text-center sm:space-y-5 md:space-y-6 md:text-left">
              <div className="inline-block bg-primary px-3 py-1.5 pixel-corner sm:px-4 sm:py-2">
                <span className="pixel-text text-[10px] text-text-dark sm:text-xs md:text-sm">
                  {hero.greeting}
                </span>
              </div>

              <h1
                className="glitch-hover pixel-text text-2xl leading-tight text-primary sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                data-text={`${hero.title_line1}\n${hero.title_line2}`}
              >
                {hero.title_line1}
                <br />
                {hero.title_line2}
              </h1>

              <p className="pixel-text text-[10px] leading-relaxed text-accent sm:text-xs md:text-sm">
                {hero.description}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3 pt-2 sm:gap-4 sm:pt-4 md:justify-start">
                {socialLinks.map((link) => {
                  const isExternal = link.href.startsWith('http');
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="flex h-10 w-10 items-center justify-center bg-primary transition-colors hover:bg-accent pixel-corner sm:h-12 sm:w-12 group"
                      aria-label={link.label}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-text-dark"
                      >
                        <path d={iconPaths[link.icon]} />
                      </svg>
                    </a>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="pt-1 sm:pt-2">
                <a
                  href="#projects"
                  className="inline-block bg-primary px-5 py-3 transition-colors hover:bg-accent pixel-corner sm:px-8 sm:py-4 group"
                >
                  <span className="pixel-text text-[10px] text-text-dark sm:text-xs md:text-sm">
                    {hero.cta}
                  </span>
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Pixel Art Character */}
          <PixelCharacter />
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
