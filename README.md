# PS Rentals

Bike and scooter rentals in Hyderabad. Customers choose a ride and dates and send their enquiry through WhatsApp.

## Deploy on Netlify

Import the GitHub repository `psrentals08/website` and select the `main` branch. Leave the base directory empty. The root `netlify.toml` selects Node 22, runs `npm run build`, and publishes `out/`.

For a manual deployment, run `npm ci` and `npm run build`, then upload the generated `out/` folder to Netlify. It contains the home, booking and contact pages and their media.

## Local development

Run `npm ci` followed by `npm run dev`. Edit fleet entries in `src/components/home/RentalHome.tsx`, pickup details in `src/constants/contact.ts`, and media in `public/`.

Website created by Rama Sivaji. Website development enquiries: ramsivaji0@gmail.com.
