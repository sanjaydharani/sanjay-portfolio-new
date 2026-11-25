# CT Sanjay — Cinematic Portfolio

Premium cinematic portfolio for **CT Sanjay**, Freelance / Creative Developer.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · Lenis · Lucide React**.

## Pages

| Route       | Content                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| `/`         | Loader intro, foreground portrait hero, intro, featured project, services, technology wall, CTA |
| `/about`    | "More than just code." editorial portrait, story, development timeline, interests, technologies |
| `/projects` | Bright Path Academy case presentation with live previews                |
| `/contact`  | Validated enquiry form → pre-filled WhatsApp message, direct WhatsApp & email |

## Local setup

Requires **Node.js 20.9+**.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## Deploy to Cloudflare Workers

This project keeps the original Next.js app, pages, styling, images, animations and interactions. Cloudflare deployment is configured with the OpenNext adapter for Cloudflare Workers.

### Install

Requires **Node.js 20.9+**. From this folder run:

```bash
npm install
```

### Test locally

```bash
npm run dev
```

### Preview in the Cloudflare Workers runtime

```bash
npm run preview
```

### Deploy

1. Create/sign in to your Cloudflare account.
2. In a terminal, run `npx wrangler login` and authorize the account.
3. From this project folder, run:
   ```bash
   npm run deploy
   ```
4. Wrangler deploys the Worker named `ct-sanjay-portfolio` to your Cloudflare account. Enable the `workers.dev` subdomain in Cloudflare if it is not already enabled.

For Git-based deployments, connect the repository to **Workers Builds** and use `npx @opennextjs/cloudflare build` as the build command and `npx @opennextjs/cloudflare deploy` as the deploy command.

### Set the public website URL

After deployment, set `NEXT_PUBLIC_SITE_URL` to the exact public URL shown by Cloudflare (or your custom domain). This is used for absolute metadata/social preview URLs; it does not change the website design. If you use Workers Builds, add it as a build variable.

## Editing content

All personal details live in **`lib/site.ts`**: name, email, WhatsApp, navigation, services, technologies and the featured project.

- **GitHub / Acode profile links:** set `site.github` / `site.acode` to your real URLs. They show as plain text in the footer until you add them.
- **Portrait:** `public/images/sanjay.png` (transparent PNG cutout of the original photo).
- **Project previews:** `public/images/brightpath-desktop.png`, `public/images/brightpath-mobile.png` (screenshots of the live site).
- **Technology logos:** `public/icons/` (official Simple Icons / Devicon SVGs and the Acode logo, served locally).

## How the WhatsApp enquiry works

The form validates every field in the browser, then opens
`https://wa.me/918098019813?text=<URL-encoded message>` in a new tab. The visitor presses **Send** inside WhatsApp. No backend or database is involved.

## Accessibility & performance

- Respects `prefers-reduced-motion` (skips the loader, disables smooth scroll and heavy motion).
- Custom cursor and magnetic effects only on fine-pointer (desktop) devices.
- Lighter parallax on mobile; fonts via `next/font`; images via `next/image`.
- Baseline security headers configured in `next.config.mjs`.
