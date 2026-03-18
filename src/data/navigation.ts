import { type NavItem } from '@/types/navigation';

export function getNavItems(nav: {
  about: string;
  projects: string;
  skills: string;
  contact: string;
}): NavItem[] {
  return [
    { label: nav.about, href: '#about' },
    { label: nav.projects, href: '#projects' },
    { label: nav.skills, href: '#skills' },
    { label: nav.contact, href: '#contact' },
  ];
}
