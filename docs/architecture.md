# Arquitectura — Astro + Islands para Portafolio

## Principio Rector

Aprovechar **Astro como generador estático** (SSG) y usar **React islands** solo donde se necesite interactividad. El resultado es un sitio rápido, con JavaScript mínimo en el cliente.

```
┌──────────────────────────────────────────────────┐
│                   Pages (.astro)                 │  ← Rutas y layout principal
│              pages/ + layouts/                   │
├──────────────────────────────────────────────────┤
│              Components (.astro)                 │  ← Contenido estático, secciones
│           Astro components sin JS                │
├──────────────────────────────────────────────────┤
│           React Islands (.tsx)                   │  ← Interactividad: animaciones,
│     client:load / client:visible / client:idle   │    menú mobile, formulario
├──────────────────────────────────────────────────┤
│                 Shared Layer                     │  ← Tipos, schemas, constantes,
│         types/ + schemas/ + data/ + i18n/        │    datos estáticos, traducciones
└──────────────────────────────────────────────────┘
```

---

## Estructura de Carpetas

```
src/
├── pages/                        # Astro pages (routing automático)
│   └── index.astro               # Página principal (single-page portfolio)
│
├── layouts/                      # Layouts Astro
│   └── BaseLayout.astro          # Layout base (head, meta, fonts, scripts)
│
├── components/                   # Componentes del sitio
│   ├── astro/                    # Componentes Astro (estáticos, sin JS)
│   │   ├── Header.astro          # Header con nav (wrapper del island React)
│   │   ├── Hero.astro            # Sección hero
│   │   ├── Projects.astro        # Sección proyectos
│   │   ├── Skills.astro          # Sección habilidades
│   │   ├── Contact.astro         # Sección contacto (wrapper del island React)
│   │   ├── Footer.astro          # Footer
│   │   └── SectionHeading.astro  # Heading reutilizable de sección
│   │
│   ├── react/                    # React islands (interactividad)
│   │   ├── MobileMenu.tsx        # Menú hamburguesa (client:load)
│   │   ├── AnimatedSection.tsx   # Wrapper de Motion para animaciones (client:visible)
│   │   ├── SkillProgressBar.tsx  # Barras de progreso animadas (client:visible)
│   │   ├── ContactForm.tsx       # Formulario de contacto (client:idle)
│   │   └── PixelCharacter.tsx    # Avatar pixel-art animado (client:visible)
│   │
│   └── ui/                       # Primitivos de UI reutilizables
│       ├── Button.astro          # Botón con variantes pixel-art
│       ├── Badge.astro           # Badge para tecnologías
│       ├── Card.astro            # Card para proyectos/skills
│       └── SocialLink.astro      # Link social con icono
│
├── data/                         # Datos estáticos del portafolio
│   ├── projects.ts               # Lista de proyectos
│   ├── skills.ts                 # Categorías de habilidades
│   ├── social-links.ts           # Links a redes sociales
│   └── navigation.ts             # Items de navegación
│
├── types/                        # Tipos TypeScript compartidos
│   ├── project.ts                # interface Project
│   ├── skill.ts                  # interface SkillCategory
│   └── navigation.ts             # interface NavItem
│
├── schemas/                      # Schemas Zod (validación)
│   └── contact.schema.ts         # Schema del formulario de contacto
│
├── i18n/                         # Internacionalización
│   ├── config.ts                 # Configuración de idiomas
│   ├── utils.ts                  # Helpers de traducción
│   └── messages/                 # Archivos de traducción
│       ├── es.json               # Español (idioma por defecto)
│       └── en.json               # Inglés
│
├── styles/                       # Estilos globales
│   ├── global.css                # Entry point CSS
│   ├── theme.css                 # Variables CSS (paleta retro)
│   └── fonts.css                 # Import de fuentes (Press Start 2P)
│
└── lib/                          # Utilidades puras
    ├── cn.ts                     # clsx + twMerge helper
    └── constants.ts              # Constantes (breakpoints, limits)
```

---

## Reglas de Dependencia

```
pages/          → importa de: layouts/, components/, data/, i18n/
layouts/        → importa de: styles/
components/astro/ → importa de: components/ui/, data/, types/, i18n/
components/react/ → importa de: types/, schemas/, i18n/, lib/
data/           → importa de: types/
types/          → NO importa de ninguna otra capa (puro TypeScript)
schemas/        → importa de: types/ (opcionalmente)
lib/            → NO importa de ninguna capa (utilidades puras)
```

### Regla de oro

> **Los componentes Astro manejan layout y contenido estático. Los React islands manejan interactividad. Los datos viven separados en `data/`.**

---

## Astro Islands — Cuándo y Cómo

### `client:load` — Se hidrata inmediatamente al cargar la página

Usar para componentes interactivos visibles desde el inicio:
- `MobileMenu.tsx` — El menú hamburguesa debe funcionar inmediatamente.

### `client:visible` — Se hidrata cuando el componente entra en el viewport

Usar para animaciones y componentes que aparecen al hacer scroll:
- `AnimatedSection.tsx` — Animaciones Motion de entrada.
- `SkillProgressBar.tsx` — Barras de progreso animadas.
- `PixelCharacter.tsx` — Avatar animado en el hero.

### `client:idle` — Se hidrata cuando el navegador está idle

Usar para componentes no urgentes:
- `ContactForm.tsx` — El formulario puede esperar a que el navegador esté libre.

### Sin directiva client — Componente Astro puro

Usar para todo lo demás:
- Header (estructura), Footer, secciones de contenido estático, cards de proyectos, badges de tecnologías.

---

## Flujo de Datos

### Datos estáticos (proyectos, skills, nav)

```
data/projects.ts (array tipado)
  → Projects.astro (importa y mapea)
    → Card.astro (renderiza cada proyecto)
```

### Interactividad (formulario)

```
ContactForm.tsx (React island, client:idle)
  → useForm() con Zod schema (schemas/contact.schema.ts)
  → onSubmit → fetch al endpoint de contacto
```

### Animaciones

```
AnimatedSection.tsx (React island, client:visible)
  → motion.div con animación de entrada
  → Children renderizados dentro del wrapper
```

### i18n

```
i18n/messages/es.json + en.json
  → Astro components: helper getTranslation(locale, key)
  → React islands: react-i18next provider + useTranslation()
```

---

## Convenciones por Capa

### `pages/` — Routing Layer

- Solo contiene archivos `.astro` que definen rutas.
- Para este portafolio, solo `index.astro` (single-page).
- Las pages son **thin**: importan el layout y componen secciones.

### `layouts/` — Layout Layer

- `BaseLayout.astro` incluye `<html>`, `<head>` (meta, fonts, og tags), y `<body>`.
- Recibe props como `title`, `description`, `lang`.

### `components/astro/` — Secciones estáticas

- Cada sección del portafolio es un componente Astro.
- Importan datos de `data/` y renderizan con Astro templating.
- Incluyen React islands donde se necesita interactividad.

### `components/react/` — Islands interactivos

- Solo componentes que necesitan JavaScript en el cliente.
- Cada archivo es autocontenido con sus imports.
- Usan Motion para animaciones, React Hook Form para formularios.

### `components/ui/` — Primitivos reutilizables

- Preferir componentes Astro (`.astro`) para UI estática.
- Solo usar React (`.tsx`) si el primitivo necesita interactividad.

### `data/` — Datos del portafolio

- Arrays y objetos tipados exportados como constantes.
- Los datos de proyectos, skills, etc. se definen aquí para fácil mantenimiento.
- Sirven como "base de datos" estática del portafolio.

### `styles/` — Estilos globales

- `global.css` es el entry point que importa fonts y theme.
- `theme.css` define las CSS variables de la paleta retro pixel-art.
- `fonts.css` importa "Press Start 2P" de Google Fonts.
