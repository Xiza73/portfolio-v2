# Plan de Implementación — Portafolio Xiza

## Visión General

Implementación progresiva del portafolio single-page con estética retro pixel-art. Cada fase produce un entregable funcional.

---

## Fase 0 — Setup del Proyecto

**Objetivo:** Configurar el entorno de desarrollo completo.

- [ ] Instalar dependencias: `@astrojs/react`, `@astrojs/tailwind`, `react`, `react-dom`, `tailwindcss`.
- [ ] Configurar `astro.config.mjs` con integraciones de React y Tailwind.
- [ ] Configurar `tsconfig.json` con strict mode y alias `@/`.
- [ ] Crear estructura de carpetas (`components/`, `data/`, `types/`, `styles/`, `layouts/`, `i18n/`, `schemas/`, `lib/`).
- [ ] Configurar estilos globales: `global.css`, `theme.css` (paleta retro), `fonts.css` (Press Start 2P).
- [ ] Configurar ESLint + Prettier para Astro/React/TypeScript.
- [ ] Crear `BaseLayout.astro` con meta tags, OG tags, fuentes.
- [ ] Verificar que `pnpm dev` funciona con una página mínima.

---

## Fase 1 — Layout y Header

**Objetivo:** Estructura base y navegación.

- [ ] Crear `Header.astro` con logo pixelado y navegación desktop.
- [ ] Crear `MobileMenu.tsx` (React island, `client:load`) con menú hamburguesa.
- [ ] Implementar navegación por anclas (`#about`, `#projects`, `#skills`, `#contact`).
- [ ] Header fijo con `position: fixed`, borde inferior dorado.
- [ ] Crear `Footer.astro` con créditos y pixel dots decorativos.
- [ ] Componer `index.astro` con layout, header y footer.

---

## Fase 2 — Sección Hero

**Objetivo:** Primera impresión del portafolio.

- [ ] Crear `Hero.astro` con presentación y columna de texto.
- [ ] Definir datos en `data/social-links.ts`.
- [ ] Crear `SocialLink.astro` para links a GitHub, LinkedIn, email.
- [ ] Crear `PixelCharacter.tsx` (React island, `client:visible`) con avatar animado.
- [ ] Crear `AnimatedSection.tsx` wrapper genérico para animaciones Motion de entrada.
- [ ] Botón CTA "VIEW_PROJECTS" con link a sección de proyectos.
- [ ] Responsive: una columna en mobile, dos columnas en desktop.

---

## Fase 3 — Sección Projects

**Objetivo:** Mostrar proyectos destacados.

- [ ] Definir tipo `Project` en `types/project.ts`.
- [ ] Crear datos en `data/projects.ts` con proyectos reales.
- [ ] Crear `Projects.astro` con heading y grid de cards.
- [ ] Crear `Card.astro` para cada proyecto (título, descripción, tech badges, links).
- [ ] Crear `Badge.astro` para tags de tecnología.
- [ ] Animaciones de entrada con `AnimatedSection.tsx` (`client:visible`).
- [ ] Hover: borde dorado → cyan, título dorado → cyan.

---

## Fase 4 — Sección Skills

**Objetivo:** Mostrar habilidades técnicas.

- [ ] Definir tipo `SkillCategory` en `types/skill.ts`.
- [ ] Crear datos en `data/skills.ts` con categorías reales.
- [ ] Crear `Skills.astro` con heading y grid de categorías.
- [ ] Crear `SkillProgressBar.tsx` (React island, `client:visible`) para barras de proficiencia animadas.
- [ ] Iconos via Lucide React para cada categoría.
- [ ] Responsive: 1 col mobile → 2 cols tablet → 3 cols desktop.

---

## Fase 5 — Sección Contact

**Objetivo:** Formulario de contacto funcional.

- [ ] Crear `Contact.astro` con info de contacto (email, ubicación).
- [ ] Crear schema Zod en `schemas/contact.schema.ts`.
- [ ] Crear `ContactForm.tsx` (React island, `client:idle`) con React Hook Form + Zod.
- [ ] Validación inline por campo con mensajes de error.
- [ ] Estilo pixel-art en inputs y botón de envío.
- [ ] Integrar con endpoint de contacto (o servicio externo como Formspree/Resend).
- [ ] Feedback visual de éxito/error tras envío.

---

## Fase 6 — i18n

**Objetivo:** Soporte bilingüe español/inglés.

- [ ] Configurar sistema de i18n (astro-i18n o custom).
- [ ] Crear archivos de traducción `i18n/messages/es.json` y `en.json`.
- [ ] Extraer todos los textos hardcodeados a claves de traducción.
- [ ] Agregar selector de idioma en el header.
- [ ] Aplicar traducciones en componentes Astro y React islands.
- [ ] Asegurar que la URL refleje el idioma (`/` para ES, `/en/` para EN) o via toggle client-side.

---

## Fase 7 — Animaciones y Polish

**Objetivo:** Pulir la experiencia visual.

- [ ] Refinar animaciones de entrada (fade-in, slide, scale) en cada sección.
- [ ] Animación del pixel character en el hero.
- [ ] Smooth scroll entre secciones.
- [ ] Transiciones hover consistentes en toda la UI.
- [ ] Loading states y skeleton si aplica.
- [ ] Asegurar que las animaciones respeten `prefers-reduced-motion`.

---

## Fase 8 — SEO, Performance y Accesibilidad

**Objetivo:** Optimizar para producción.

- [ ] Meta tags completos (title, description, OG, Twitter cards).
- [ ] Favicon pixelado.
- [ ] Verificar Lighthouse score (target: 90+ en todas las categorías).
- [ ] Atributos ARIA en navegación, formulario y elementos interactivos.
- [ ] Alt text en imágenes.
- [ ] Contraste de colores WCAG AA.
- [ ] Optimizar bundle size (verificar que solo las islands cargan JS).
- [ ] Lazy loading de fuentes.

---

## Fase 9 — Testing

**Objetivo:** Cobertura de tests.

- [ ] Tests unitarios con Vitest para utilidades y schemas Zod.
- [ ] Tests de componentes React con React Testing Library.
- [ ] Tests e2e con Playwright: navegación, formulario de contacto, responsive.
- [ ] Verificar que el build (`pnpm build`) genera correctamente.

---

## Fase 10 — Deploy

**Objetivo:** Publicar el portafolio.

- [ ] Configurar deploy (Vercel, Netlify o Cloudflare Pages).
- [ ] Configurar dominio personalizado.
- [ ] Configurar analytics (opcional).
- [ ] Verificar que todo funciona en producción.
