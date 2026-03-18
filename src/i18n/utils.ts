import { DEFAULT_LANGUAGE, type Language } from './config';
import en from './messages/en.json';
import es from './messages/es.json';

const translations = { es, en } as const;

export function getTranslation(lang: Language) {
  return translations[lang] ?? translations[DEFAULT_LANGUAGE];
}

export function getLocaleFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return DEFAULT_LANGUAGE;
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === DEFAULT_LANGUAGE) return path;
  return `/${lang}${path}`;
}
