# Kamrul Hasan Faysal — Portfolio

A cinematic personal portfolio presenting software engineering, community involvement, and entrepreneurship as one practice. The site includes a minimal engineering monogram, editorial project case studies, a skills matrix, a personal interests section, responsive navigation, accessible motion controls, and a small keyboard easter egg.

## Technology

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run lint
npm run build
```

The standard `dev`, `build`, and `start` commands use native Next.js and are compatible with Vercel. The `dev:sites`, `build:sites`, and `start:sites` commands target the Sites/Cloudflare runtime.

## Structure

- `app/` — route, metadata, and global visual system
- `components/portfolio.tsx` — page sections and interactions
- `data/` — centralized profile and project content
- `public/` — favicon and résumé placeholder

## Customization

Edit `data/profile.ts` for identity, contact links, and availability. Edit `data/projects.ts` to add projects or refine verified repository descriptions. Replace `public/resume/kamrul-hasan-faysal-resume.txt` with a PDF, then update `resumeUrl` in `data/profile.ts`.

## Deploying to Vercel

Import the repository and set the Vercel project **Root Directory** to `frontend`. Keep the Framework Preset on **Next.js**, leave the Output Directory override disabled, and deploy. The included `vercel.json` selects the native Next.js build. No environment variables or backend services are required.
