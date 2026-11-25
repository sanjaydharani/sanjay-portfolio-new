# Deploy CT Sanjay portfolio to Cloudflare Workers

The original website components and visual styling are retained. This project uses the OpenNext Cloudflare adapter to run the existing Next.js application on Cloudflare Workers.

## Before deploying

- Use Node.js 20.9 or newer.
- Keep this project folder intact, including `app/`, `components/`, `lib/`, and `public/`.
- Do not upload only the `public/` folder; this is a Next.js application, not a plain static site.

## Deploy from a computer

1. Extract the ZIP file.
2. Open a terminal in the extracted `ct-sanjay-portfolio` folder.
3. Run `npm install`.
4. Run `npx wrangler login` and authorize the correct Cloudflare account.
5. Run `npm run preview` to test the site in the Cloudflare Workers runtime.
6. If the preview works, run `npm run deploy`.

Cloudflare will deploy the Worker named `ct-sanjay-portfolio`. The public `workers.dev` address is shown in the Cloudflare dashboard after deployment. A custom domain can be attached there later.

## Optional social-preview URL

After deployment, set `NEXT_PUBLIC_SITE_URL` to the exact public URL Cloudflare assigned, for example `https://your-worker-name.your-account.workers.dev`. If using Workers Builds, add this as a build variable. It is used for absolute metadata/social-preview URLs only; it does not change the visible site design.

## Git-based deployment

Connect the repository under Cloudflare Workers & Pages / Workers Builds. Use:

- Build command: `npx @opennextjs/cloudflare build`
- Deploy command: `npx @opennextjs/cloudflare deploy`
- Root directory: the folder containing this `package.json`
- Build variable: `NEXT_PUBLIC_SITE_URL` set to the deployed URL, once known

## What changed for Cloudflare

- Removed the Vercel Analytics component and dependency. This only removes Vercel-specific visitor analytics; it does not remove any visible website section or animation.
- Removed the old Vercel URL from site metadata. The public URL is now configured with `NEXT_PUBLIC_SITE_URL` after Cloudflare assigns it.
- Added OpenNext and Wrangler configuration and deployment scripts.
- Updated this documentation for Cloudflare.

The home/about/projects/contact pages, visual components, styles, local images, GSAP/Framer Motion/Lenis behavior, and WhatsApp/email contact logic have been left in place.
