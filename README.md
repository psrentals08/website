# PS Rentals — GitHub Pages

Mobile-friendly static Next.js storefront with WhatsApp bookings and exact Google Maps directions.

## Local development
Run `npm ci` then `npm run dev`.

## GitHub Pages deployment
1. Push the changes to `main` in https://github.com/psrentals08/psr.
2. Set repository **Settings → Pages → Source → GitHub Actions**.
3. Run **Deploy GitHub Pages**, or push to `main`.
4. Once deployment succeeds, use https://psrentals08.github.io/psr/.

`npm run build:pages` exports to `out/` for `/psr`. The workflow obtains the path from GitHub so custom domains work too. `npm run build` exports for a domain root. No Node server is required on the host. Do not commit `out/`, `.next/`, or `node_modules/`.

## Structure
- `.github/workflows/pages.yml`: build and deployment workflow
- `scripts/build-pages.mjs`: static export and `.nojekyll`
- `src/app`: homepage, booking, contact, layout, responsive CSS
- `src/components`: storefront, form, contact and shared header/footer
- `src/constants/contact.ts`: exact address and Google Maps destination
- `src/lib`: WhatsApp helpers and GitHub Pages asset paths
- `public`: logo, bike photos and video

## Rental enquiries
Scooters are ₹499/day, standard motorcycles are ₹599/day, and Jawa and Royal Enfield are ₹1,500/day. Customers send their own WhatsApp enquiry to +91 99858 19038. The business must confirm availability; there is no payment processor or reservation database.

Website created by Rama Sivaji. Website development enquiries: ramsivaji0@gmail.com.

