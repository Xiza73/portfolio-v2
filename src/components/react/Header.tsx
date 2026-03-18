import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { getNavItems } from '@/data/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { toggleLanguage } from '@/stores/language';

function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = getNavItems(t.nav);
  const switchLabel = t.language.switch_label;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b-4 border-primary bg-bg"
      role="banner"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="relative flex h-14 items-center justify-between sm:h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" data-logo>
            <div className="relative h-6 w-6 overflow-hidden bg-primary pixel-corner sm:h-8 sm:w-8">
              <div className="absolute right-0 top-0 h-2 w-2 bg-bg sm:h-3 sm:w-3"></div>
            </div>
            <span
              data-logo-text
              className="pixel-text text-xs tracking-wider text-primary sm:text-sm md:text-xl"
            >
              XIZA.EXE
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="pixel-text text-xs text-primary transition-colors duration-200 hover:text-accent lg:text-sm"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="pixel-text text-xs text-accent transition-colors duration-200 hover:text-primary lg:text-sm cursor-pointer"
            >
              [{switchLabel}]
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-primary hover:text-accent transition-colors cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isMenuOpen && (
              <nav
                className="absolute left-0 right-0 top-full border-t-2 border-primary bg-bg px-4 py-5 sm:px-6"
                role="navigation"
              >
                <div className="flex flex-col gap-5">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="pixel-text text-xs text-primary transition-colors duration-200 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      toggleLanguage();
                      setIsMenuOpen(false);
                    }}
                    className="pixel-text text-xs text-accent transition-colors duration-200 hover:text-primary text-left cursor-pointer"
                  >
                    [{switchLabel}]
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export { Header };
