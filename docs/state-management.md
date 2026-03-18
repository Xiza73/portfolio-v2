# State Management — Portafolio

---

## Principio: Mínimo Estado Necesario

Un portafolio es mayoritariamente **contenido estático**. La mayor parte de los datos se resuelve en build time con Astro. Solo se necesita estado de cliente para interacciones puntuales.

---

## Tipos de Estado

| Tipo                   | Herramienta        | Ejemplos                                       |
| ---------------------- | ------------------ | ---------------------------------------------- |
| **Datos estáticos**    | Archivos TS        | Proyectos, skills, social links, nav items     |
| **Estado de UI local** | `useState` (React) | Menú mobile abierto/cerrado, form fields       |
| **Estado de form**     | React Hook Form    | Valores del formulario de contacto             |
| **Estado de idioma**   | i18n context       | Idioma seleccionado (ES/EN)                    |

### Lo que NO necesitamos

- **Zustand / Redux:** No hay estado global complejo. Un menú toggle y un selector de idioma no lo justifican.
- **TanStack Query:** No hay API REST que consumir. Los datos son estáticos.
- **Context API (React):** El único contexto potencial es i18n, y eso lo maneja la librería.

---

## Datos Estáticos — `data/`

Los datos del portafolio (proyectos, skills, etc.) viven como constantes TypeScript:

```typescript
// data/projects.ts
import { type Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'E-COMMERCE.APP',
    description: 'Full-stack e-commerce platform...',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/xiza/ecommerce',
    demo: 'https://ecommerce.demo.com',
  },
  // ...
];
```

**Ventajas:**
- Type-safe.
- Disponibles en build time (Astro los consume sin JS en el cliente).
- Fácil de mantener y actualizar.
- Sin latencia de red.

---

## Estado de UI Local — `useState`

Para componentes React interactivos (islands):

### Menú Mobile

```tsx
// components/react/MobileMenu.tsx
function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  // ...
}
```

### Formulario de Contacto

```tsx
// components/react/ContactForm.tsx
function ContactForm() {
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(values: ContactFormInput) {
    setSubmitStatus('idle');
    try {
      await sendContactForm(values);
      setSubmitStatus('success');
      form.reset();
    } catch {
      setSubmitStatus('error');
    }
  }

  // ...
}
```

---

## Estado de Idioma — i18n

El idioma seleccionado se maneja a nivel de ruta (Astro) o con un toggle en el cliente:

```typescript
// Opción A: Rutas por idioma (SSG)
// /       → español
// /en/    → inglés

// Opción B: Toggle client-side
// localStorage para persistir la preferencia
// Context/state para el valor actual
```

Ver [i18n.md](i18n.md) para la estrategia completa.

---

## Reglas

1. **No agregar librerías de state management** a menos que surja una necesidad clara.
2. **Datos del portafolio en `data/`**, nunca hardcodeados en componentes.
3. **`useState` solo en React islands** — Astro components no tienen estado de cliente.
4. **React Hook Form para el formulario** — no manejar form state manualmente.
5. **Si se necesita estado compartido entre islands**, evaluar primero si se puede resolver con props o refactorizando la estructura de componentes antes de agregar Context o Zustand.
