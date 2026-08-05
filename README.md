# Luxury Indian Wedding Invitation

A modern React + Vite single-page app for a luxury Indian wedding invitation experience.

## Features

- Animated opening intro modal
- Smooth scroll with Lenis
- Decorative petals and section dividers
- Event, gallery, family, story, venue and countdown sections
- Responsive layout with Tailwind-style classes

## Run Locally

**Prerequisites:** Node.js 18+ and npm

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown by Vite in your browser.

## Build

To build a production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/` - application source files
- `src/components/` - React components for sections, decorations, and UI
- `src/assets/` - static image assets
- `index.html` - application entry HTML
- `vite.config.js` - Vite configuration

## Notes

- The app currently does not require any API keys or external secrets.
- `dist/` and `node_modules/` are generated artifacts and should not be committed.
