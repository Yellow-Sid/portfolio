# Portfolio — Sidhaant Pradhan

React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide.

## Setup
```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview
```

## Customise
All content lives in `src/config/data.ts`: email, GitHub/LinkedIn, projects, skills and about text. Replace every `TODO`.
Colors and font are in `tailwind.config.js`; the page title and meta tags are in `index.html`.

## Deploy
- **Vercel:** import the repo, framework "Vite", build `npm run build`, output `dist`.
- **Netlify:** build command `npm run build`, publish directory `dist`.

The contact form opens the visitor's mail app (mailto). To send from the site itself, connect a form service such as Formspree.
