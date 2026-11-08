# CardFlow on Vercel

CardFlow is a small static web app with a Node.js serverless function for payment plan checks. It starts with no sample cards; add your own card details on the full-screen card entry page, and amounts are displayed in Indian rupees. Card details and recent activity are saved in the browser's local storage on the device where the app is used. Data does not sync between browsers or devices and can be lost if browser data is cleared. The Vercel function does not save or receive card numbers or account credentials.

## Deploy

Deploy this folder as the Vercel project root. Vercel serves `index.html` as the page and `api/plan.js` as a Node.js function. The included `vercel.json` configures the function runtime.

For local preview with the Vercel CLI, run `vercel dev` from this folder, then open the local URL it prints. Opening the HTML file directly will not provide the `/api/plan` endpoint.

The starter cards are sample values. Edit them to match your cards. This app estimates credit available from values you enter; your issuer's app is the source of truth for cash advance limits, fees, and interest.
