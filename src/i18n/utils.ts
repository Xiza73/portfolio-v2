import { DEFAULT_LANGUAGE, type Language } from './config';
import en from './messages/en.json';
import es from './messages/es.json';

const translations = { es, en } as const;

export function getTranslation(lang: Language) {
  return translations[lang] ?? translations[DEFAULT_LANGUAGE];
}
