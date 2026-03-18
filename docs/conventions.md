# Convenciones de Código

---

## Naming

### Archivos y Carpetas

| Tipo                     | Convención                       | Ejemplo                  |
| ------------------------ | -------------------------------- | ------------------------ |
| Componentes Astro        | PascalCase + `.astro`            | `Header.astro`           |
| Componentes React        | PascalCase + `.tsx`              | `ContactForm.tsx`        |
| Hooks                    | camelCase con prefijo `use`      | `use-mobile.ts`          |
| Archivos de utilidad     | kebab-case                       | `cn.ts`                  |
| Schemas Zod              | kebab-case con sufijo `.schema`  | `contact.schema.ts`      |
| Datos estáticos          | kebab-case                       | `social-links.ts`        |
| Tipos                    | kebab-case                       | `project.ts`             |
| Constantes/enums         | kebab-case con sufijo `.enums`   | `navigation.enums.ts`    |
| Tests                    | mismo nombre + `.test`           | `ContactForm.test.tsx`   |
| Traducciones i18n        | kebab-case por idioma            | `es.json`, `en.json`     |
| Layouts Astro            | PascalCase + `.astro`            | `BaseLayout.astro`       |

### Variables y Funciones

| Tipo              | Convención                                  | Ejemplo                              |
| ----------------- | ------------------------------------------- | ------------------------------------ |
| Variables         | camelCase                                   | `projectList`                        |
| Funciones         | camelCase                                   | `formatDate()`                       |
| Componentes React | PascalCase                                  | `function ContactForm()`             |
| Hooks             | camelCase con `use`                         | `useMobile()`                        |
| Constantes        | UPPER_SNAKE_CASE                            | `MAX_MESSAGE_LENGTH`                 |
| Enums (as const)  | PascalCase objeto, UPPER_SNAKE para valores | `Language.ES`                        |
| Tipos/Interfaces  | PascalCase                                  | `interface Project {}`               |
| Generics          | letra mayúscula descriptiva                 | `<TData>`, `<TError>`               |
| Props interfaces  | PascalCase con sufijo `Props`               | `interface ContactFormProps {}`      |
| Event handlers    | `on` + Verbo + Sustantivo                   | `onSubmitForm`, `onToggleMenu`       |
| Boolean variables | prefijo `is`/`has`/`can`/`should`           | `isMenuOpen`, `hasError`             |

---

## Estructura de Componentes React

### Orden interno de un componente

```tsx
// 1. Imports (en orden: React, externas, @/ internas, relativas, estilos)
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/schemas/contact.schema';
import { type ContactFormInput } from '@/types/contact';

// 2. Tipos locales (si son solo para este componente)
interface ContactFormProps {
  onSuccess: () => void;
}

// 3. Componente (función nombrada, export al final)
function ContactForm({ onSuccess }: ContactFormProps) {
  // 3a. Hooks (React hooks primero, luego custom hooks)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3b. Variables derivadas / memoización
  const isValid = useMemo(() => /* ... */, [formState]);

  // 3c. Handlers
  function handleSubmit(values: ContactFormInput) {
    // ...
  }

  // 3d. Early returns (loading, error, empty)
  if (isSubmitting) return <LoadingSpinner />;

  // 3e. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX */}
    </form>
  );
}

export { ContactForm };
```

### Estructura de Componentes Astro

```astro
---
// 1. Imports
import BaseLayout from '@/layouts/BaseLayout.astro';
import Header from '@/components/astro/Header.astro';
import { projects } from '@/data/projects';
import type { Project } from '@/types/project';

// 2. Props (si aplica)
interface Props {
  title: string;
}

const { title } = Astro.props;

// 3. Lógica del servidor (datos, computaciones)
const featuredProjects = projects.filter(p => p.featured);
---

<!-- 4. Template -->
<section id="projects">
  <h2 class="pixel-text text-primary">{title}</h2>
  {featuredProjects.map(project => (
    <div>{project.title}</div>
  ))}
</section>
```

### Exports

- **Componentes React (islands):** `export` nombrado.
- **Componentes Astro:** export por defecto (convención Astro para imports).
- **Hooks, utilidades, tipos:** `export` nombrado siempre.
- **No usar barrel files** (`index.ts`) excepto en `components/ui/` para agrupar primitivos.

---

## Patrones de Código

### Conditional Rendering (React)

```tsx
// Bien — operador ternario para simple
{isLoading ? <Skeleton /> : <ProjectList projects={data} />}

// Bien — && para mostrar/ocultar (asegurarse de que el lado izquierdo sea boolean)
{hasProjects && <ProjectList projects={data} />}

// Mal — && con número (puede renderizar "0")
{projects.length && <ProjectList />}  // ❌
{projects.length > 0 && <ProjectList />}  // ✅
```

### Conditional Rendering (Astro)

```astro
{projects.length > 0 && (
  <div class="grid">
    {projects.map(p => <Card project={p} />)}
  </div>
)}

{projects.length === 0 && (
  <p class="pixel-text text-accent">No projects found.</p>
)}
```

### Datos Estáticos

```typescript
// data/projects.ts
import { type Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'E-COMMERCE.APP',
    description: 'Full-stack e-commerce platform...',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/xiza/project',
    demo: 'https://project.demo.com',
  },
  // ...
];
```

### Formularios (React Island)

```tsx
// Siempre: React Hook Form + Zod schema
const form = useForm<ContactFormInput>({
  resolver: zodResolver(contactSchema),
  defaultValues: {
    name: '',
    email: '',
    message: '',
  },
});
```

---

## Tailwind CSS

### Orden de clases

Seguir un orden lógico (no es enforced por herramientas, pero mantener consistencia):

1. Layout (`flex`, `grid`, `block`, `hidden`)
2. Sizing (`w-`, `h-`, `min-`, `max-`)
3. Spacing (`p-`, `m-`, `gap-`)
4. Typography (`text-`, `font-`, `leading-`, `pixel-text`)
5. Visual (`bg-`, `border-`, `rounded-`, `shadow-`)
6. Interactive (`hover:`, `focus:`, `active:`)
7. Transitions (`transition-`, `duration-`)

### Responsive

```html
<!-- Mobile-first: el estilo base es mobile, luego se escala -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

### Variantes con CVA (si se necesita)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center pixel-corner pixel-text transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-text-dark hover:bg-accent',
        outline: 'border-4 border-primary text-primary hover:border-accent hover:text-accent',
        ghost: 'text-primary hover:text-accent',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
```

---

## Imports

### Path Aliases

```typescript
// Siempre usar alias @/ en lugar de rutas relativas profundas
import { projects } from '@/data/projects';      // ✅
import { projects } from '../../data/projects';   // ❌

// Rutas relativas solo dentro del mismo módulo/carpeta
import { formatDate } from './helpers';            // ✅ (mismo directorio)
```

---

## Zod Schemas

```typescript
// Nombre: entity + Schema
export const contactSchema = z.object({
  name: z.string().min(1, 'required').max(100, 'max_length'),
  email: z.string().email('invalid_email'),
  message: z.string().min(10, 'min_length').max(1000, 'max_length'),
});

// Tipo derivado del schema
export type ContactFormInput = z.infer<typeof contactSchema>;
```

---

## Cosas a Evitar

- **No usar `any`** — usar `unknown` + type narrowing.
- **No usar `enum` de TypeScript** — usar `as const` objects.
- **No usar CSS modules** ni styled-components.
- **No crear archivos `types.ts` globales** — colocar tipos junto a su contexto.
- **No hacer fetch desde componentes directamente** — encapsular en funciones.
- **No usar `!important`** en estilos.
- **No hardcodear textos** — siempre vía i18n.
- **No usar React donde Astro puro es suficiente** — menos JS en el cliente.
- **No usar `useEffect` para animaciones** — usar Motion / CSS transitions.
