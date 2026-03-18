# Testing — Estrategia de Testing para Portafolio

---

## Herramientas

| Herramienta             | Propósito                                     |
| ----------------------- | --------------------------------------------- |
| Vitest                  | Test runner y framework de tests unitarios    |
| React Testing Library   | Testing de componentes React (islands)        |
| Playwright              | Tests end-to-end (navegación, formulario)     |
| @testing-library/jest-dom | Matchers adicionales para DOM                |

---

## Estrategia por Capa

### 1. Utilidades y Helpers (`lib/`)

**Herramienta:** Vitest

Tests puros sin DOM. Verificar funciones de utilidad:

```typescript
// lib/cn.test.ts
import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra');
  });
});
```

### 2. Schemas Zod (`schemas/`)

**Herramienta:** Vitest

Verificar validación de datos:

```typescript
// schemas/contact.schema.test.ts
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
      message: 'Hello!',
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
});
```

### 3. Datos Estáticos (`data/`)

**Herramienta:** Vitest

Verificar integridad de los datos del portafolio:

```typescript
// data/projects.test.ts
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

  it('github URLs are valid', () => {
    for (const project of projects) {
      if (project.github) {
        expect(project.github).toMatch(/^https:\/\//);
      }
    }
  });
});
```

### 4. Componentes React Islands (`components/react/`)

**Herramienta:** Vitest + React Testing Library

Verificar comportamiento interactivo:

```typescript
// components/react/ContactForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: /send/i });
    await userEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const onSuccess = vi.fn();
    render(<ContactForm onSuccess={onSuccess} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'Manuel');
    await userEvent.type(screen.getByLabelText(/email/i), 'contact@xiza.dev');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello, great portfolio!');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
```

```typescript
// components/react/MobileMenu.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MobileMenu } from './MobileMenu';

describe('MobileMenu', () => {
  const navItems = ['About', 'Projects', 'Skills', 'Contact'];

  it('is closed by default', () => {
    render(<MobileMenu navItems={navItems} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('opens when toggle button is clicked', async () => {
    render(<MobileMenu navItems={navItems} />);
    await userEvent.click(screen.getByLabelText(/toggle menu/i));
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders all nav items when open', async () => {
    render(<MobileMenu navItems={navItems} />);
    await userEvent.click(screen.getByLabelText(/toggle menu/i));
    for (const item of navItems) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});
```

### 5. Tests End-to-End (`e2e/`)

**Herramienta:** Playwright

Verificar flujos completos en el navegador:

```typescript
// e2e/portfolio.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads the home page', async ({ page }) => {
    await expect(page).toHaveTitle(/Xiza|Manuel Fajardo/i);
  });

  test('navigation links scroll to sections', async ({ page }) => {
    await page.click('a[href="#projects"]');
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const menuButton = page.getByLabel('Toggle menu');
    await menuButton.click();
    await expect(page.getByRole('navigation')).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole('navigation')).not.toBeVisible();
  });

  test('contact form validates required fields', async ({ page }) => {
    await page.click('button:has-text("SEND")');
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('contact form submits successfully', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message.');
    await page.click('button:has-text("SEND")');
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
```

---

## Configuración

### Vitest (`vitest.config.ts`)

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/types/**'],
    },
  },
});
```

### Setup (`tests/setup.ts`)

```typescript
import '@testing-library/jest-dom/vitest';
```

### Playwright (`playwright.config.ts`)

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'pnpm preview',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4321',
  },
});
```

---

## Cobertura Target

| Capa                | Target | Prioridad |
| ------------------- | ------ | --------- |
| Schemas Zod         | 100%   | Alta      |
| Utilidades (`lib/`) | 100%   | Alta      |
| Datos (`data/`)     | 90%+   | Media     |
| React Islands       | 80%+   | Media     |
| E2E flows           | Todos  | Alta      |

---

## Comandos

```bash
pnpm test              # Ejecutar tests unitarios
pnpm test:watch        # Tests en modo watch
pnpm test:coverage     # Tests con reporte de cobertura
pnpm test:e2e          # Tests end-to-end con Playwright
pnpm test:e2e:ui       # Playwright con UI interactiva
```
