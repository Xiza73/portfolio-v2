# Reglas de Negocio — Portafolio Xiza

---

## Identidad

- **Nombre:** Manuel Fajardo (Xiza)
- **Rol:** Software Engineer
- **Marca personal:** Estética retro pixel-art / terminal de 8-bit

---

## Navegación

1. El portafolio es **single-page** con navegación por anclas.
2. El header es **fijo** (`position: fixed`) y siempre visible.
3. Los links de navegación hacen scroll suave a la sección correspondiente.
4. En mobile (< `md`), la navegación se colapsa en un menú hamburguesa.
5. Al hacer click en un link del menú mobile, el menú se cierra automáticamente.

---

## Secciones — Orden y Contenido

### 1. Hero (`#about`)

- Título principal: "SOFTWARE ENGINEER".
- Tag decorativo: "HELLO_WORLD.EXE" (estilo terminal).
- Descripción breve del perfil profesional.
- Links a redes sociales (GitHub, LinkedIn, Email).
- CTA principal que lleva a la sección de proyectos.
- Avatar/personaje pixel-art decorativo.

### 2. Projects (`#projects`)

- Título: "RECENT_WORK" con tag "PROJECTS.DIR".
- Grid de cards de proyectos (2 columnas en desktop).
- Cada proyecto muestra:
  - Título en estilo terminal (e.g., `E-COMMERCE.APP`).
  - Descripción breve.
  - Tags de tecnologías usadas.
  - Link a repositorio GitHub (opcional).
  - Link a demo en vivo (opcional).
- Los proyectos se obtienen de `data/projects.ts` (datos estáticos).

### 3. Skills (`#skills`)

- Título: "TECH_STACK" con tag "SKILLS.SYS".
- Grid de categorías de habilidades (3 columnas en desktop).
- Cada categoría muestra:
  - Icono representativo.
  - Nombre de la categoría (FRONTEND, BACKEND, etc.).
  - Lista de tecnologías.
- Sección adicional: barras de proficiencia animadas para áreas generales.

### 4. Contact (`#contact`)

- Título: "GET_IN_TOUCH" con tag "CONTACT.EXE".
- Dos columnas: info de contacto (izq) + formulario (der).
- Info de contacto: email, ubicación, mensaje de disponibilidad.
- Formulario con campos: nombre, email, mensaje.
- **No mostrar número de teléfono** — solo email y ubicación.

### 5. Footer

- Pixel dots decorativos.
- Texto de créditos: "CODED WITH ♥ BY XIZA".
- Copyright con año dinámico.

---

## Formulario de Contacto

1. **Campos obligatorios:** nombre, email, mensaje.
2. **Validación:**
   - Nombre: mínimo 1 carácter, máximo 100.
   - Email: formato válido de email.
   - Mensaje: mínimo 10 caracteres, máximo 1000.
3. **Errores:** mostrar inline debajo de cada campo, en estilo pixel-text.
4. **Submit:** enviar a endpoint configurado (Formspree, Resend, o API propia).
5. **Feedback:**
   - Éxito: mensaje de confirmación visible.
   - Error: mensaje de error con opción de reintentar.
6. **Tras éxito:** limpiar el formulario.
7. **Rate limiting:** considerar protección contra spam (honeypot field o reCAPTCHA).

---

## Datos del Portafolio

1. Los datos (proyectos, skills, social links, nav items) viven en `src/data/`.
2. **No hay backend/API** — todo es estático.
3. Para actualizar contenido, se editan los archivos TypeScript y se redespliega.
4. Los datos deben estar tipados con interfaces de `src/types/`.

---

## Estilo Visual

1. **Paleta fija:** negro, dorado (#FFD700), cyan (#00FFFF), blanco.
2. **Tipografía:** "Press Start 2P" para todos los textos (`.pixel-text`).
3. **Bordes pixelados:** usar `.pixel-corner` (clip-path) en botones, cards, avatares.
4. **Transiciones hover:** dorado → cyan en textos, bordes y fondos.
5. **Animaciones:** Motion (framer-motion) para entradas suaves al hacer scroll.
6. **Modo oscuro exclusivo:** no hay modo claro.

---

## i18n

1. Dos idiomas: **español** (por defecto) e **inglés**.
2. Los tags decorativos estilo terminal se mantienen en inglés/terminal-style en ambos idiomas (son parte del branding: `HELLO_WORLD.EXE`, `PROJECTS.DIR`, etc.).
3. Los textos funcionales (descripciones, labels, mensajes) sí se traducen completamente.
4. Selector de idioma visible en el header.

---

## Responsive

1. **Mobile-first:** el diseño base es para mobile.
2. **Breakpoints:**
   - `sm` (640px): Ajustes de tipografía.
   - `md` (768px): Navegación desktop, grids de 2 columnas.
   - `lg` (1024px): Grids de 3 columnas, máximo ancho de texto.
3. **Max width:** contenido limitado a `max-w-6xl` (1152px) centrado.
4. **Header:** navegación completa en desktop, hamburguesa en mobile.

---

## Performance

1. **Astro SSG:** la página se genera estáticamente. Mínimo JS en el cliente.
2. **React islands:** solo se hidratan los componentes que necesitan interactividad.
3. **Fuente pixelada:** cargar "Press Start 2P" con `display=swap` para evitar FOIT.
4. **Imágenes:** si se agregan, usar formatos optimizados (WebP/AVIF) y lazy loading.
5. **Target Lighthouse:** 90+ en Performance, Accessibility, Best Practices, SEO.

---

## Accesibilidad

1. Links de navegación con texto descriptivo.
2. Botón de menú mobile con `aria-label="Toggle menu"`.
3. Formulario con `<label>` asociados a cada input.
4. Links externos con `target="_blank"` y `rel="noopener noreferrer"`.
5. Links sociales con `aria-label` descriptivo (e.g., "GitHub", "LinkedIn").
6. Contraste de colores suficiente (dorado sobre negro cumple WCAG AA).
7. Respetar `prefers-reduced-motion` desactivando animaciones.
