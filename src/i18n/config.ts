export const LANGUAGES = {
  es: 'Español',
  en: 'English',
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = 'es';
