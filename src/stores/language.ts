import { atom } from 'nanostores';

import { DEFAULT_LANGUAGE, type Language, LANGUAGES } from '@/i18n/config';

export const $language = atom<Language>(DEFAULT_LANGUAGE);

export function initLanguage() {
  const saved = localStorage.getItem('language');
  if (saved && saved in LANGUAGES) {
    $language.set(saved as Language);
  }

  $language.subscribe((lang) => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  });
}

export function toggleLanguage() {
  const current = $language.get();
  $language.set(current === 'es' ? 'en' : 'es');
}
