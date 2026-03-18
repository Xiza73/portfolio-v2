# Xiza.dev — Portfolio

Portafolio personal de Manuel Fajardo (Xiza), Software Engineer. Estética retro pixel-art con fondo negro, tipografía "Press Start 2P", bordes pixelados y paleta dorado/cyan/negro.

## Stack

- **Framework:** [Astro 6](https://astro.build) (SSG + islands)
- **UI:** [React 19](https://react.dev) (interactive islands) + [Tailwind CSS 4](https://tailwindcss.com)
- **Lenguaje:** TypeScript (strict mode)
- **Animaciones:** [Motion](https://motion.dev) (framer-motion)
- **Icons:** [Lucide React](https://lucide.dev)
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest + React Testing Library + Playwright
- **Package Manager:** pnpm

## Inicio rápido

```bash
# Requisitos: Node.js >= 22.12.0, pnpm
pnpm install
pnpm dev        # http://localhost:4321
```

## Comandos

| Comando              | Descripción                     |
| -------------------- | ------------------------------- |
| `pnpm dev`           | Servidor de desarrollo          |
| `pnpm build`         | Build de producción (SSG)       |
| `pnpm preview`       | Preview del build               |
| `pnpm lint`          | Linting con ESLint              |
| `pnpm lint:fix`      | Lint con auto-fix               |
| `pnpm format`        | Formatear con Prettier          |
| `pnpm test`          | Tests unitarios (Vitest)        |
| `pnpm test:e2e`      | Tests e2e (Playwright)          |

## Estructura del proyecto

```
src/
├── components/
│   ├── react/         # Islands interactivas (React 19)
│   ├── astro/         # Componentes estáticos (Astro)
│   └── ui/            # Componentes UI reutilizables
├── layouts/           # BaseLayout.astro
├── pages/             # Páginas (index, 404, API)
├── data/              # Datos estáticos (proyectos, skills, social links)
├── hooks/             # Custom React hooks
├── i18n/              # Internacionalización (ES/EN)
├── lib/               # Utilidades y hooks compartidos
├── schemas/           # Schemas Zod de validación
├── stores/            # State management (nanostores)
├── styles/            # Global CSS + theme
└── types/             # TypeScript types
```

## Secciones

1. **Header** — Navegación fija con logo pixelado, links de sección, menú hamburguesa mobile
2. **Hero** — Presentación principal, Pac-Man pixel-art animado, links sociales, CTA
3. **Projects** — Grid de proyectos con tecnologías, links a código/demo
4. **Skills** — Categorías de habilidades con barras de proficiencia animadas
5. **Contact** — Formulario de contacto con validación (React Hook Form + Zod)
6. **Footer** — Créditos y copyright
7. **404** — Página de error como juego de plataformas pixel-art

## Easter eggs

El sitio contiene varios easter eggs ocultos. Algunas pistas:

- `↑↑↓↓←→←→BA`
- Mantén presionado ciertas cosas...
- Haz click donde nadie hace click
- Haz hover con paciencia
- Abre la consola del navegador
- Visita una página que no existe

## i18n

Soporte bilingüe ES/EN. Los textos de UI se manejan via archivos JSON en `src/i18n/messages/`. El idioma se detecta y persiste en `localStorage`.

## Theming

Sistema de theming basado en CSS variables definidas en `src/styles/theme.css`. Los colores se exponen como utilidades de Tailwind via `@theme inline`.

## Licencia

MIT
