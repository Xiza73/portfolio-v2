import { describe, expect, it } from 'vitest';

import { getLocaleFromUrl, getLocalizedPath, getTranslation } from './utils';

describe('getTranslation', () => {
  it('returns Spanish translations for "es"', () => {
    const t = getTranslation('es');
    expect(t.hero.cta).toBe('VER_PROYECTOS');
  });

  it('returns English translations for "en"', () => {
    const t = getTranslation('en');
    expect(t.hero.cta).toBe('VIEW_PROJECTS');
  });

  it('has matching keys in both languages', () => {
    const es = getTranslation('es');
    const en = getTranslation('en');

    function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
      return Object.entries(obj).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          return getKeys(value as Record<string, unknown>, path);
        }
        return [path];
      });
    }

    const esKeys = getKeys(es).sort();
    const enKeys = getKeys(en).sort();
    expect(esKeys).toEqual(enKeys);
  });
});

describe('getLocaleFromUrl', () => {
  it('returns "es" for root URL', () => {
    expect(getLocaleFromUrl(new URL('http://localhost/'))).toBe('es');
  });

  it('returns "en" for /en/ URL', () => {
    expect(getLocaleFromUrl(new URL('http://localhost/en/'))).toBe('en');
  });

  it('returns "es" for unknown prefix', () => {
    expect(getLocaleFromUrl(new URL('http://localhost/fr/'))).toBe('es');
  });
});

describe('getLocalizedPath', () => {
  it('returns path as-is for default language', () => {
    expect(getLocalizedPath('/', 'es')).toBe('/');
  });

  it('prefixes path with /en for English', () => {
    expect(getLocalizedPath('/', 'en')).toBe('/en/');
  });
});
