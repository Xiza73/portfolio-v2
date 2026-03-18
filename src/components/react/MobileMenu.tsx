import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { type NavItem } from '@/types/navigation';

interface MobileMenuProps {
  navItems: NavItem[];
  switchLabel: string;
  switchPath: string;
}

function MobileMenu({ navItems, switchLabel, switchPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        onClick={handleToggle}
        className="text-primary hover:text-accent transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <nav
          className="absolute left-0 right-0 top-full border-t-2 border-primary bg-bg px-4 py-5 sm:px-6"
          role="navigation"
        >
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="pixel-text text-xs text-primary transition-colors duration-200 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
            <a
              href={switchPath}
              className="pixel-text text-xs text-accent transition-colors duration-200 hover:text-primary"
            >
              [{switchLabel}]
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}

export { MobileMenu };
