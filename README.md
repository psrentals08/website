# PS Rentals

PS Rentals is a Next.js 16 App Router application. Its existing `src/app` structure is supported by Vercel, so the project does not need a Vercel-specific folder layout or a `vercel.json` file.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy with Vercel

1. Import the GitHub repository into Vercel.
2. Keep the project root set to `.` and let Vercel detect Next.js.
3. Keep the default build command (`npm run build`) and output settings.
4. Deploy. Vercel can deploy future commits from the connected Git branch automatically.

Vercel uses the standard Next.js build and output settings; no custom deployment configuration is needed.

## Current app behavior

The booking and contact forms are front-end demonstrations: bookings are stored in each visitor's browser, and the contact form only displays a local confirmation. They do not submit to a shared database or send messages. The admin screens are demo screens and are publicly accessible, so do not use them for private or live booking data.
