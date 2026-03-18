import { describe, expect, it } from 'vitest';

import { contactSchema } from './contact.schema';

describe('contactSchema', () => {
  it('validates correct input', () => {
    const result = contactSchema.safeParse({
      name: 'Manuel',
      email: 'contact@xiza.dev',
      message: 'Hello, I want to collaborate!',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'contact@xiza.dev',
      message: 'Hello, I want to collaborate!',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Manuel',
      email: 'not-an-email',
      message: 'Hello, I want to collaborate!',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short message (< 10 chars)', () => {
    const result = contactSchema.safeParse({
      name: 'Manuel',
      email: 'contact@xiza.dev',
      message: 'Hi',
    });
    expect(result.success).toBe(false);
  });

  it('rejects message over 1000 chars', () => {
    const result = contactSchema.safeParse({
      name: 'Manuel',
      email: 'contact@xiza.dev',
      message: 'a'.repeat(1001),
    });
    expect(result.success).toBe(false);
  });

  it('accepts message at exact boundaries', () => {
    const min = contactSchema.safeParse({
      name: 'A',
      email: 'a@b.com',
      message: 'a'.repeat(10),
    });
    const max = contactSchema.safeParse({
      name: 'A',
      email: 'a@b.com',
      message: 'a'.repeat(1000),
    });
    expect(min.success).toBe(true);
    expect(max.success).toBe(true);
  });
});
