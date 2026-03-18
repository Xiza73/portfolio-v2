import { describe, expect, it } from 'vitest';

import { proficiencyLevels, skillCategories } from './skills';

describe('skillCategories data', () => {
  it('has at least one category', () => {
    expect(skillCategories.length).toBeGreaterThan(0);
  });

  it('every category has a title and skills', () => {
    for (const cat of skillCategories) {
      expect(cat.title).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(cat.skills.length).toBeGreaterThan(0);
    }
  });
});

describe('proficiencyLevels data', () => {
  it('has at least one level', () => {
    expect(proficiencyLevels.length).toBeGreaterThan(0);
  });

  it('levels are between 0 and 100', () => {
    for (const level of proficiencyLevels) {
      expect(level.level).toBeGreaterThanOrEqual(0);
      expect(level.level).toBeLessThanOrEqual(100);
    }
  });
});
