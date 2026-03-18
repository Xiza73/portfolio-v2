import { useEffect, useState } from 'react';

interface ActiveNavHighlightProps {
  sectionIds: string[];
}

function ActiveNavHighlight({ sectionIds }: ActiveNavHighlightProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    // Update all nav links' styles based on active section
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not([data-logo])');
    for (const link of links) {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('!text-accent');
      } else {
        link.classList.remove('!text-accent');
      }
    }
  }, [activeId]);

  return null;
}

export { ActiveNavHighlight };
