import { describe, expect, it } from 'vitest';

import { projects } from './projects';

describe('projects data', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('every project has required fields', () => {
    for (const project of projects) {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tech.length).toBeGreaterThan(0);
    }
  });

  it('github URLs are valid when present', () => {
    for (const project of projects) {
      if (project.github) {
        expect(project.github).toMatch(/^https:\/\//);
      }
    }
  });

  it('demo URLs are valid when present', () => {
    for (const project of projects) {
      if (project.demo) {
        expect(project.demo).toMatch(/^https:\/\//);
      }
    }
  });
});
