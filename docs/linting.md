# Linting y Formateo

Reglas de calidad de código, configuración de ESLint, Prettier y TypeScript strict para Astro + React.

---

## Herramientas

| Herramienta              | Versión | Propósito                                |
| ------------------------ | ------- | ---------------------------------------- |
| ESLint                   | 9.x     | Análisis estático y reglas de código     |
| Prettier                 | 3.x     | Formateo automático                      |
| typescript-eslint        | 8.x     | Reglas específicas de TypeScript         |
| eslint-plugin-astro      | latest  | Reglas específicas de Astro              |
| simple-import-sort       | 12.x    | Ordenamiento automático de imports       |
| eslint-plugin-prettier   | 5.x     | Integración Prettier ↔ ESLint           |
| prettier-plugin-astro    | latest  | Formateo de archivos `.astro`            |

---

## Comandos

```bash
pnpm lint            # Ejecutar ESLint
pnpm lint:fix        # Corregir problemas auto-fixables
pnpm format          # Formatear con Prettier
pnpm format:check    # Verificar formato sin modificar
```

---

## Archivos de Configuración

| Archivo                | Descripción                                    |
| ---------------------- | ---------------------------------------------- |
| `eslint.config.mjs`   | Configuración ESLint (flat config, ESLint 9)   |
| `.prettierrc`          | Reglas de formateo Prettier                    |
| `.prettierignore`      | Archivos excluidos de Prettier                 |
| `tsconfig.json`        | Configuración TypeScript (strict mode)         |

---

## Configs Base (ESLint)

La configuración extiende las siguientes bases, en este orden:

1. **`@eslint/js` recommended** — reglas fundamentales de JavaScript.
2. **`eslint-plugin-astro` recommended** — mejores prácticas de Astro.
3. **`typescript-eslint` recommendedTypeChecked** — reglas de TypeScript con type-checking.
4. **`eslint-plugin-prettier/recommended`** — ejecuta Prettier como regla de ESLint.

---

## Reglas de TypeScript

| Regla                                          | Nivel   | Descripción                                                  |
| ---------------------------------------------- | ------- | ------------------------------------------------------------ |
| `@typescript-eslint/no-explicit-any`           | `warn`  | Evitar `any`; preferir `unknown` + narrowing.                |
| `@typescript-eslint/no-floating-promises`      | `error` | Las promesas deben ser `await`-eadas o manejadas.            |
| `@typescript-eslint/no-unsafe-argument`        | `warn`  | No pasar valores `any` como argumento.                       |
| `@typescript-eslint/no-unsafe-assignment`      | `warn`  | No asignar valores `any` a variables tipadas.                |
| `@typescript-eslint/no-unused-vars`            | `error` | Variables no usadas son error. Prefijo `_` para ignorar.     |
| `@typescript-eslint/consistent-type-imports`   | `error` | Usar `import { type Foo }` (inline type imports).            |
| `@typescript-eslint/no-inferrable-types`       | `error` | No anotar tipos que TypeScript puede inferir.                |

### Patrón de variables ignoradas

```ts
// Correcto: prefijo _ para indicar que se ignora intencionalmente
const [_unused, setCount] = useState(0);
function handler(_event: MouseEvent) { /* ... */ }

// Incorrecto: variable no usada sin prefijo
const [unused, setCount] = useState(0); // error
```

### Type imports

```ts
// Correcto: inline type imports
import { type Project, type SkillCategory } from '@/types/project';
import { useState } from 'react';

// Incorrecto
import type { Project } from '@/types/project'; // no usar `import type`
```

---

## Orden de Imports

El plugin `simple-import-sort` organiza los imports automáticamente en este orden:

```ts
// 1. Astro y React
import { useState } from 'react';

// 2. Paquetes externos
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'motion/react';

// 3. @/ imports internos
import { projects } from '@/data/projects';
import { contactSchema } from '@/schemas/contact.schema';
import { cn } from '@/lib/cn';

// 4. Imports relativos (padres)
import { parentHelper } from '../helpers';

// 5. Imports relativos (directorio actual)
import { localUtil } from './utils';

// 6. Type imports (al final)
import { type Project } from '@/types/project';
```

> Los imports y exports se ordenan automáticamente con `pnpm lint:fix`.

---

## Reglas Core

| Regla                  | Nivel   | Descripción                                      |
| ---------------------- | ------- | ------------------------------------------------ |
| `no-console`           | `warn`  | Evitar `console.log` en producción.              |
| `no-duplicate-imports` | `error` | No importar del mismo módulo más de una vez.     |

---

## Excepciones para Tests

Los archivos `**/*.test.ts`, `**/*.test.tsx` y `**/*.spec.ts` tienen reglas relajadas:

| Regla                                        | Nivel | Motivo                                              |
| -------------------------------------------- | ----- | --------------------------------------------------- |
| `@typescript-eslint/unbound-method`          | `off` | Permitir pasar métodos como callbacks en mocks.     |
| `@typescript-eslint/no-unsafe-assignment`    | `off` | Permitir mocks y fixtures con tipos flexibles.      |

---

## Prettier — Reglas de Formateo

| Opción           | Valor      | Descripción                                    |
| ---------------- | ---------- | ---------------------------------------------- |
| `singleQuote`    | `true`     | Comillas simples para strings.                 |
| `trailingComma`  | `"all"`    | Coma trailing en estructuras multilínea.       |
| `printWidth`     | `100`      | Ancho máximo de línea.                         |
| `tabWidth`       | `2`        | Indentación de 2 espacios.                     |
| `semi`           | `true`     | Punto y coma obligatorio.                      |
| `arrowParens`    | `"always"` | Paréntesis siempre en arrow functions.         |
| `endOfLine`      | `"auto"`   | Detectar automáticamente.                      |
| `plugins`        | `["prettier-plugin-astro"]` | Soporte para archivos `.astro`. |

### Archivos Ignorados por Prettier

```
dist
.astro
node_modules
pnpm-lock.yaml
coverage
```

---

## TypeScript Strict Mode

El `tsconfig.json` extiende `astro/tsconfigs/strict`, lo que activa:

- `strictNullChecks` — `null` y `undefined` son tipos distintos.
- `strictFunctionTypes` — chequeo estricto de tipos en parámetros de funciones.
- `strictBindCallApply` — chequeo estricto en `bind`, `call`, `apply`.
- `noImplicitAny` — error si TypeScript no puede inferir y el tipo sería `any`.
- `alwaysStrict` — emitir `"use strict"` en cada archivo.

---

## Ignorados Globales (ESLint)

Los siguientes paths se excluyen del análisis:

```
dist/**
.astro/**
node_modules/**
coverage/**
```

---

## Checklist Rápido

Antes de hacer commit, verifica:

- [ ] `pnpm lint` pasa sin errores.
- [ ] `pnpm format:check` pasa sin diferencias.
- [ ] No hay `any` explícitos (o están justificados con `// eslint-disable-next-line`).
- [ ] Los imports están ordenados.
- [ ] Los type imports usan `import { type ... }`.
- [ ] No hay `console.log` sin justificación.
- [ ] Las promesas están correctamente `await`-eadas o manejadas con `.catch()`.
