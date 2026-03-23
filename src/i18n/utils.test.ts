import { describe, expect, it } from 'vitest';

import { getTranslation } from './utils';

describe('getTranslation', () => {
  it('returns Spanish translations for "es"', () => {
    const t = getTranslation('es');
    expect(t.hero.cta).toBe('VER_CV');
  });

  it('returns English translations for "en"', () => {
    const t = getTranslation('en');
    expect(t.hero.cta).toBe('VIEW_CV');
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
