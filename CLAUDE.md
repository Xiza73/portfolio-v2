# Portafolio Manuel Fajardo (Xiza) — Reglas del Proyecto

Segunda versión del portafolio personal con **Astro**, **React 19**, **Tailwind CSS 4** y **TypeScript**.

Estética **retro pixel-art**: fondo negro, tipografía "Press Start 2P", bordes pixelados, paleta dorado/cyan/negro.

---

## Stack Tecnológico

- **Framework:** Astro 6 (SSG por defecto, islands para interactividad)
- **UI:** React 19 (island components) + Tailwind CSS 4
- **Lenguaje:** TypeScript (strict mode)
- **Package Manager:** pnpm
- **Animaciones:** Motion (framer-motion)
- **Icons:** Lucide React
- **i18n:** astro-i18n / react-i18next (para islands React)
- **Forms:** React Hook Form + Zod (formulario de contacto)
- **Testing:** Vitest + React Testing Library + Playwright (e2e)

---

## Documentación Complementaria

Antes de implementar cualquier feature, consulta los documentos relevantes:

| Documento              | Ruta                                                   | Descripción                                         |
| ---------------------- | ------------------------------------------------------ | --------------------------------------------------- |
| Arquitectura           | [architecture.md](docs/architecture.md)                | Arquitectura Astro + Islands para portafolio        |
| Temas y Paletas        | [themes.md](docs/themes.md)                            | Paleta retro pixel-art (dorado/cyan/negro)          |
| Convenciones           | [conventions.md](docs/conventions.md)                  | Naming, estructura de archivos, patrones de código  |
| Plan de Implementación | [implementation-plan.md](docs/implementation-plan.md)  | Fases y orden de desarrollo                         |
| Testing                | [testing.md](docs/testing.md)                          | Estrategia de testing por capa                      |
| State Management       | [state-management.md](docs/state-management.md)        | Manejo de estado mínimo para portafolio             |
| i18n                   | [i18n.md](docs/i18n.md)                                | Estrategia de internacionalización (ES/EN)          |
| Reglas de Negocio      | [business-rules.md](docs/business-rules.md)            | Reglas que la UI debe respetar                      |
| Linting                | [linting.md](docs/linting.md)                          | ESLint, Prettier, TypeScript strict                 |
| Primer borrador de UI  | [App.tsx](docs/ui-draft/src/app/App.tsx)               | Código inicial de la UI basado en Figma             |

---

## Reglas Generales

### Idioma

- **Código** (variables, funciones, componentes, tipos): siempre en **inglés**.
- **Textos de UI** (labels, mensajes, placeholders): siempre via **i18n**, nunca hardcodeados.
- **Comentarios**: en inglés. Solo cuando el código no es autoexplicativo.
- **Documentación del proyecto**: en español.
- **Commits**: en inglés, formato Conventional Commits (`feat:`, `fix:`, `refactor:`, etc.).

### TypeScript

- **Strict mode** obligatorio. No usar `any` — preferir `unknown` y narrowing.
- Usar `interface` para shapes de objetos. Usar `type` para uniones, intersecciones y utilidades.
- No usar `enum` de TypeScript — usar `as const` objects con tipo derivado.
- Los tipos de datos del portafolio van en `src/types/`. Los tipos de UI son locales al componente.
- Exportar tipos junto a donde se usan; no crear archivos `types.ts` genéricos a nivel global.

### Componentes

- **Astro components** (`.astro`) para contenido estático y layout. Son la opción por defecto.
- **React components** (`.tsx`) solo para islas interactivas (`client:load`, `client:visible`, `client:idle`).
- **Funciones nombradas** (`function Component()`) para React — no arrow functions para componentes.
- **Un componente por archivo**. El archivo lleva el nombre del componente en PascalCase.
- Hooks personalizados en archivos separados con prefijo `use`.
- Props destructuradas directamente en la firma de la función.

### Astro Islands

- Usar `client:visible` para componentes que aparecen al hacer scroll (animaciones Motion).
- Usar `client:load` solo para componentes críticos visibles desde el inicio (Header con menú mobile).
- Usar `client:idle` para componentes no urgentes (formulario de contacto).
- Preferir Astro puro cuando no se necesita interactividad.

### Estilos

- **Tailwind CSS 4** como sistema principal. No CSS modules ni styled-components.
- Usar **CSS variables** para theming (paleta retro pixel-art).
- Clases utilitarias en el JSX/Astro. Para componentes reutilizables con variantes, usar `cva` (class-variance-authority).
- Responsive design **mobile-first**.
- No usar `!important`. Si hay conflictos, revisar la especificidad.
- Clases custom: `.pixel-text` (tipografía retro), `.pixel-corner` (bordes pixelados via clip-path).

### Imports y Módulos

- Usar el alias `@/` que apunta a `src/`.
- Orden de imports (enforced por ESLint):
  1. Astro / React
  2. Librerías externas
  3. `@/` imports internos
  4. Imports relativos (`./ ../`)
  5. Estilos

### Formularios

- Usar React Hook Form + Zod para el formulario de contacto.
- El schema Zod de validación vive en `src/schemas/`.
- Validar en frontend antes de enviar. Mostrar errores inline por campo.

### Git & Branching

- Rama principal: `main`.
- Ramas de feature: `feat/<section>/<description>` (ej: `feat/hero/animation`).
- Ramas de fix: `fix/<section>/<description>`.
- Commits atómicos. Un commit = un cambio lógico.

### Seguridad

- No exponer datos sensibles en el código fuente (emails reales van en variables de entorno).
- Sanitizar inputs del formulario de contacto antes de procesar.
- Variables de entorno del servidor con prefijo `SECRET_` en Astro.
- Variables públicas con prefijo `PUBLIC_` en Astro.

---

## Variables de Entorno

```env
PUBLIC_SITE_URL=https://xiza.dev           # URL pública del sitio
PUBLIC_CONTACT_EMAIL=contact@xiza.dev      # Email de contacto (público)
SECRET_FORM_ENDPOINT=                      # Endpoint para procesar formulario de contacto
```

---

## Comandos

```bash
pnpm dev          # Desarrollo
pnpm build        # Build de producción (SSG)
pnpm preview      # Preview del build
pnpm lint         # Linting
pnpm lint:fix     # Linting con auto-fix
pnpm format       # Formatear con Prettier
pnpm test         # Tests unitarios (Vitest)
pnpm test:e2e     # Tests e2e (Playwright)
```

---

## Secciones del Portafolio

Basado en el diseño de Figma (ver `docs/ui-draft/`):

1. **Header** — Navegación fija con logo pixelado, links de sección, menú hamburguesa mobile.
2. **Hero** — Presentación principal, título "Software Engineer", avatar pixel-art, links sociales, CTA.
3. **Projects** — Grid de proyectos con título, descripción, tecnologías, links a código/demo.
4. **Skills** — Grid de categorías de habilidades con iconos, barras de proficiencia animadas.
5. **Contact** — Info de contacto + formulario (nombre, email, mensaje).
6. **Footer** — Créditos y copyright.

---

## Alcance Actual

- Implementación de la página principal del portafolio basado en el diseño de Figma.
- Estética retro pixel-art consistente en todas las secciones.
- Animaciones de entrada con Motion (framer-motion).
- Integración de i18n para soporte bilingüe (ES/EN).
- Responsive design mobile-first.
- Formulario de contacto funcional con validación.
