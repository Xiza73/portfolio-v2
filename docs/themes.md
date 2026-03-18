# Temas y Paletas — Estética Retro Pixel-Art

## Concepto Visual

El portafolio utiliza una estética **retro pixel-art / terminal** inspirada en videojuegos clásicos de 8-bit. El diseño combina tipografía pixelada, bordes angulares y una paleta de alto contraste.

---

## Paleta de Colores Principal

| Token                | Hex       | Uso                                              |
| -------------------- | --------- | ------------------------------------------------ |
| `--color-bg`         | `#000000` | Fondo principal                                  |
| `--color-bg-surface` | `#0a0a0a` | Fondo de cards, secciones alternas               |
| `--color-bg-input`   | `#0a0a0a` | Fondo de inputs del formulario                   |
| `--color-bg-subtle`  | `#1a1a1a` | Fondo de badges, barras de progreso vacías        |
| `--color-primary`    | `#FFD700` | Dorado — color principal (títulos, bordes, CTAs)  |
| `--color-accent`     | `#00FFFF` | Cyan — color de acento (hover, highlights, links) |
| `--color-text`       | `#FFFFFF` | Texto de contenido (descripciones, párrafos)      |
| `--color-text-dark`  | `#000000` | Texto sobre fondos dorado/cyan                   |

---

## Aplicación de Colores

### Textos

| Elemento              | Color                 | Clase Tailwind                   |
| --------------------- | --------------------- | -------------------------------- |
| Títulos de sección    | Dorado `#FFD700`      | `text-primary`                   |
| Subtítulos / labels   | Cyan `#00FFFF`        | `text-accent`                    |
| Descripción / cuerpo  | Blanco `#FFFFFF`      | `text-text`                      |
| Texto sobre CTA       | Negro `#000000`       | `text-text-dark`                 |

### Fondos

| Elemento              | Color                 | Clase Tailwind                   |
| --------------------- | --------------------- | -------------------------------- |
| Página                | Negro `#000000`       | `bg-bg`                          |
| Cards / secciones     | Casi-negro `#0a0a0a`  | `bg-bg-surface`                  |
| Badges de tecnología  | Gris oscuro `#1a1a1a` | `bg-bg-subtle`                   |
| Botones / CTAs        | Dorado `#FFD700`      | `bg-primary`                     |
| Iconos de redes       | Dorado `#FFD700`      | `bg-primary`                     |

### Bordes

| Elemento              | Color                 | Clase Tailwind                   |
| --------------------- | --------------------- | -------------------------------- |
| Header bottom         | Dorado `#FFD700`      | `border-primary`                 |
| Cards                 | Dorado `#FFD700`      | `border-primary`                 |
| Cards hover           | Cyan `#00FFFF`        | `hover:border-accent`            |
| Inputs                | Dorado `#FFD700`      | `border-primary`                 |
| Inputs focus          | Cyan `#00FFFF`        | `focus:border-accent`            |

### Estados Interactivos

| Estado                | Efecto                                          |
| --------------------- | ----------------------------------------------- |
| Hover en links        | Dorado → Cyan                                   |
| Hover en cards        | Borde dorado → borde cyan, título dorado → cyan |
| Hover en botones/CTAs | Fondo dorado → fondo cyan                       |
| Hover en iconos       | Fondo dorado → fondo cyan                       |
| Focus en inputs       | Borde dorado → borde cyan                       |

---

## CSS Variables — `theme.css`

```css
:root {
  /* Backgrounds */
  --color-bg: #000000;
  --color-bg-surface: #0a0a0a;
  --color-bg-input: #0a0a0a;
  --color-bg-subtle: #1a1a1a;

  /* Primary & Accent */
  --color-primary: #FFD700;
  --color-accent: #00FFFF;

  /* Text */
  --color-text: #FFFFFF;
  --color-text-dark: #000000;
}
```

Estas variables se integran con el `@theme inline` de Tailwind CSS 4 para usarse como clases utilitarias (`bg-primary`, `text-accent`, etc.).

---

## Tipografía

### Fuente Principal — Press Start 2P

Fuente pixelada de Google Fonts que da el estilo retro 8-bit.

```css
.pixel-text {
  font-family: 'Press Start 2P', cursive;
  image-rendering: pixelated;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
}
```

**Uso:** Todos los textos de UI llevan `.pixel-text`. Esto incluye títulos, labels, descriptions, botones y navegación.

### Tamaños de texto

| Uso                  | Clases Tailwind                         |
| -------------------- | --------------------------------------- |
| Título hero (h1)     | `text-4xl sm:text-5xl lg:text-6xl`      |
| Título sección (h2)  | `text-3xl sm:text-4xl`                  |
| Subtítulo (h3)       | `text-xl` o `text-2xl`                  |
| Cuerpo               | `text-sm sm:text-base`                  |
| Labels / tags        | `text-sm`                               |
| Badge / small        | `text-xs`                               |

---

## Elementos Decorativos

### Pixel Corner (clip-path)

Bordes recortados que simulan esquinas pixeladas de 8px:

```css
.pixel-corner {
  clip-path: polygon(
    0 8px, 8px 8px, 8px 0,
    calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%,
    8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px)
  );
}
```

**Uso:** Botones, cards de social links, logo, avatar, CTAs.

### Decoraciones de esquina

Cuadrados pequeños de color cyan en las esquinas de elementos destacados:
```html
<div class="absolute -top-2 -left-2 w-4 h-4 bg-accent" />
```

### Pixel dots

Cuadrados de 3x3px alternando dorado/cyan para separadores:
```html
<div class="flex gap-2">
  <div class="w-3 h-3 bg-primary" />
  <div class="w-3 h-3 bg-accent" />
  <div class="w-3 h-3 bg-primary" />
</div>
```

---

## Modo Oscuro

El portafolio es **exclusivamente dark**. No hay modo claro planificado. La paleta está diseñada para máximo contraste sobre fondo negro.

Si en el futuro se agrega modo claro, se invertirían los roles:
- Fondo: blanco/gris claro
- Texto principal: negro/gris oscuro
- Dorado y cyan se mantendrían como colores de marca

---

## Responsive

La paleta y los estilos son consistentes en todos los breakpoints. Los cambios responsive afectan tamaño de texto y layout (grid columns), no colores ni estilo visual.

| Breakpoint | Uso principal                              |
| ---------- | ------------------------------------------ |
| Mobile     | 1 columna, texto más pequeño               |
| `sm:`      | Texto ligeramente más grande               |
| `md:`      | Grids de 2 columnas, nav desktop           |
| `lg:`      | Grids de 3 columnas, texto máximo          |
