# KEDEMON — landing page

Landing page de KEDEMON: detección de caídas por IA para residencias de
ancianos, en tiempo real y sin cámaras que graben.

**En producción:** https://hecto0r.github.io/kedemon/

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (tema en `src/index.css`, sin `tailwind.config.js`)
- [Framer Motion](https://motion.dev/) vía `LazyMotion` + `m.*` (bundle reducido — ver nota abajo)
- [Lucide React](https://lucide.dev/) para iconos
- Inter (auto-alojada, sin llamada a Google Fonts — ver `src/assets/fonts/`)
- [Web3Forms](https://web3forms.com/) para el envío del formulario, sin backend propio
- Despliegue automático a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

### Formulario de contacto

El formulario envía a través de Web3Forms. Necesitas una clave propia:

1. Entra en [web3forms.com](https://web3forms.com), pon tu email y pulsa
   "Create Access Key" (gratis, sin contraseña).
2. Copia `.env.example` a `.env` y pega la clave:
   ```
   VITE_WEB3FORMS_KEY=tu_clave_aqui
   ```
3. Reinicia `npm run dev`.

Sin esta clave, el formulario muestra un error honesto en vez de fingir
que el envío funcionó.

## Build

```bash
npm run build   # genera dist/
npm run lint    # oxlint sobre src/
```

## Despliegue

Cada push a `main` dispara `.github/workflows/deploy.yml`, que construye el
proyecto y lo publica en GitHub Pages. La clave de Web3Forms se inyecta en
el build desde el secreto de repo `VITE_WEB3FORMS_KEY` (Settings → Secrets
and variables → Actions) — sin ella configurada ahí, el formulario falla
en producción aunque funcione en local.

`vite.config.js` usa `base: './'` (rutas relativas) para que el sitio
funcione igual en un subpath de GitHub Pages y en un dominio propio, sin
tocar la configuración al cambiar de uno a otro.

## Estructura

```
src/
  components/   Un componente por sección de la página
  hooks/         useInView (scroll reveal), useCountUp (contador de stats)
  assets/        Logo SVG y fuente auto-alojada
public/
  privacidad.html   Página estática de política de privacidad
  og-image.png      Imagen para compartir en redes (1200x630)
  robots.txt, sitemap.xml, site.webmanifest
```

## Notas pendientes

- Varias URLs (canonical, og:url, robots.txt, sitemap.xml) apuntan
  temporalmente a `hecto0r.github.io/kedemon` — actualízalas al dominio
  real en cuanto lo compres.
- `public/privacidad.html` es un borrador de buena fe, no asesoría legal:
  conviene que lo revise un abogado antes de un lanzamiento comercial serio.
