---
name: design-context
description: Sistema de diseño del sitio de Salmon Wallet — paleta navy/naranja, tipografía DM Sans/DM Mono, componentes y secciones reales, i18n. Usar SIEMPRE antes de tocar UI, colores, tipografía o copy de este repo. Incluye límites para claims públicos y la advertencia sobre el rediseño revertido.
---

# Design Context — salmon-website

Landing de Salmon Wallet (Next.js App Router + next-intl + Tailwind v4). Dark editorial: navy profundo con acento salmón.

## Ojo primero — dos cosas que rompen suposiciones

1. **El rediseño fue revertido.** Hubo un rediseño en la branch `redesign/upstream` (visión "Skills/Skill Store", componentes `AnimatedBeam`/`BeamNode`/`Reveal`/`StatusBadge`) que **se abandonó**. Esos componentes **NO existen** en el sitio vivo, y **`docs/REBUILD-BRIEF.md` no existe**. El sitio actual es el pre-rediseño restaurado, manteniendo el bloque de validator stats en vivo. No trabajes contra el rediseño muerto.
2. **Los claims públicos requieren evidencia concreta.** Confirmado por el usuario: Salmon pasó una auditoría en 2024, patrocinada por Eclipse Foundation y realizada por Halborn. No están confirmados "$200M+ protected", "50k+ users" ni "4.8★"; jamás renderizarlos como verdad sin evidencia. Proof adicional disponible: repo open-source + validator stats en vivo.

## Tokens — `app/globals.css` (`@theme`, Tailwind v4, sin config file)

- Acento: `--color-accent #ff5c45`, `--color-accent-end rgba(161,42,42,0.9)`, `--color-accent-soft #ff7e6d`.
- Fondo: `--color-bg-primary #10131c` (también hardcodeado en `body`), `--color-bg-secondary #161c2d`.
- Texto: `#ffffff` / `#8a8d98` / `#6b6e7b`. Bordes `#404962`. Status `--color-success #10b981`, `--color-error #ef4444`.
- Type scale / spacing / easing como tokens (`--text-h2` clamp, `--space-section`, `--ease-expo-out`). Helpers `.font-display`, `.eyebrow`, `.no-scrollbar`, `@keyframes marquee`.
- `#8a8d98` sobre navy es contraste borderline — verificá WCAG si lo usás para texto importante.

## Tipografía — `app/layout.tsx`

`DM_Sans` (`--font-dm-sans`, 400/500/700) + `DM_Mono` (`--font-dm-mono`, 300/400/500) vía `next/font/google`; mapeadas en globals.css a `--font-sans`/`--font-mono`/`--font-display`. `themeColor: '#ff7e6d'`.

## Componentes reales

- `components/ui/`: `AccordionItem`, `GlassmorphicCard`, `GradientButton`, `NumberTicker`, `ParticlesBackground`, `ScrollReveal`.
- Secciones (`components/`): `Hero`, `Navbar`, `CardSection`, `Features`, `Why`, `Manifesto`, `Footer`, `Chains`, `FAQ`, `Security`, `GetSalmon`, más `components/sections/ValidatorStats.tsx` (stats en vivo — la pieza de proof real).

## i18n — next-intl

Locales `en` (default) / `es` / `pt`, `localePrefix: 'as-needed'` (`lib/i18n/routing.ts`). Mensajes en `messages/{en,es,pt}.json` (keys top-level: `metadata, nav, hero, chains, why, features, security, manifesto, faq, getSalmon, validator, footer`). Rutas: `app/[locale]/{layout,page}.tsx` + `privacy` + `terms`. Audiencia = devs/open-source → tono técnico, "don't trust, verify".
