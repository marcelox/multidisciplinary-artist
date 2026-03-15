# Photography Portfolio

[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/docs/kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Directus](https://img.shields.io/badge/Directus-CMS--Self--hosted-6644FF?logo=directus&logoColor=white)](https://directus.io)
[![Coolify](https://img.shields.io/badge/Coolify-6B16ED?logo=coolify&logoColor=white)](https://coolify.io)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)

A multilingual photography portfolio website built with SvelteKit and powered by Directus as a headless CMS.

## Stack

- **SvelteKit 2** — SSR-first
- **TypeScript**
- **Directus** — headless CMS, self-hosted via Coolify
- **Paraglide** — i18n (English, German, Spanish)

## Features

- Multilingual content (EN/DE/ES) managed through Directus translations
- WCAG AA

## Setup

```bash
cp .env.example .env
```

Set `DIRECTUS_URL` to your Directus instance.

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run check` | Type checking |
| `npm run lint` | Lint and format check |
| `npm run test:unit` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E tests (Playwright) |

## Project Structure

```
src/
├── lib/
│   ├── server/directus.ts   # Directus SDK setup and helpers
│   └── paraglide/           # i18n runtime
├── routes/
│   └── [lang]/
│       ├── +page.svelte     # Project grid (homepage)
│       ├── projects/[slug]  # Single project view
│       ├── about            # Artist bio + exhibitions
│       └── contact          # Contact page
└── app.html
```

