import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('handles conditional classes', () => {
    const isHidden = false;
    expect(cn('base', isHidden && 'hidden', 'extra')).toBe('base extra');
  });

  it('handles undefined and null', () => {
    expect(cn('base', undefined, null, 'extra')).toBe('base extra');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});
