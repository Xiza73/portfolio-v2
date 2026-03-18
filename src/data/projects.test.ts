import { describe, expect, it } from 'vitest';

import { getProjects } from './projects';

const projects = getProjects('es');

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
      for (const repo of project.github) {
        expect(repo.url).toMatch(/^https:\/\//);
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
