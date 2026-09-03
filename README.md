# Sunil Karki — Portfolio

A modern, animated portfolio built with React, Vite, Tailwind CSS v4, and
Framer Motion — a single-page journey at `/`, plus a dedicated detail page
per project (e.g. `/projects/picklematch`) via React Router.

## Getting started

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Editing content

All real content — name, tagline, bio, stats, skills, projects, experience, and
social links — lives in one file: [`src/data/portfolio.js`](src/data/portfolio.js).
Edit that file and every section updates automatically; you shouldn't need to
touch the components for a content change.

Filled in from your resume already: `profile.email`, `profile.resumeUrl`
(points at `public/resume.pdf` — replace that file whenever your resume
changes), the `experience` timeline, the `certifications` list, and `skills`.

Still to fill in before publishing:

- `profile.social.github` and `profile.social.linkedin` — placeholder URLs
  right now; your resume linked "LinkedIn" as text but the PDF didn't expose
  the underlying URL, so paste your real profile links in.
- `profile.social.twitter` — optional, delete the line (and its usage in
  `Hero.jsx` / `Contact.jsx`) if you don't want an X/Twitter icon shown.
- `profile.location` — not on your resume; add a city if you want it shown.
- `projects` — PickleMatch is real (from your resume-adjacent files); the
  other 2 cards are still placeholders. Replace with your real projects
  (title, description, tags, category, GitHub/live links).
- PickleMatch's live link (`projects[0].live`) is still `#` — add an App
  Store / TestFlight / web link if you have one.

### Giving a project its own detail page

Any project with a `slug` field gets a dedicated page at
`/projects/<slug>` (see [`src/pages/ProjectDetail.jsx`](src/pages/ProjectDetail.jsx))
and its card in the Projects grid becomes clickable. Add `longDescription`
(an array of paragraphs), `features` (an array of bullet strings), and
optionally `status` (a short badge like `"In development"`, shown instead
of "Featured" on the card) to populate that page — see PickleMatch's entry
in `portfolio.js` for the shape. A project without a `slug` stays a plain
(non-clickable) card, same as before.

To add real screenshots to a project's detail page, drop image files in
`public/projects/<slug>/` and reference them in that project's
`screenshots` array as `{ src: '/projects/<slug>/file.png', alt, caption }`
— see PickleMatch's two app screenshots for the pattern.

## The 3D journey background

[`src/three/Journey.jsx`](src/three/Journey.jsx) renders a fixed, full-page
WebGL scene (Three.js via `@react-three/fiber`) on the home page: a
starfield, a sun, and a run of colored planets — one per section — with
Earth as the destination, arriving as the Contact section comes into view.
Scroll position (0–1 across the whole page) drives the camera's position
along a spline curve — see `useJourneyCurve` for the path, `WAYPOINTS` for
where each body sits along it, and `Rig` for the camera-follow logic. It's
lazy-loaded (`React.lazy` in `pages/HomePage.jsx`) so the Three.js bundle
(~235KB gzipped) downloads after the page shell is already interactive.
Colors are pulled from the same palette as the rest of the site
(`--color-primary/secondary/accent` in `index.css`) — update both places
together if you change the theme. It only renders on `/`, not on project
detail pages.

## Deploying

This is a static Vite build, so it deploys to any static host. Because it
now uses real client-side routes (`/projects/<slug>`), the host needs to
rewrite unknown paths back to `index.html` so a direct link or a page
refresh on `/projects/picklematch` doesn't 404 — both are already set up:

- **Vercel**: connect the repo, build command `npm run build`, output
  directory `dist`. [`vercel.json`](vercel.json) already has the rewrite.
- **Netlify**: same build/output settings. [`public/_redirects`](public/_redirects)
  already has the rewrite (Vite copies it into `dist/` on build).
- **GitHub Pages**: doesn't support this kind of rewrite natively. Either
  switch `BrowserRouter` to `HashRouter` in `src/App.jsx` (URLs become
  `/#/projects/picklematch`, but need zero server config), or use the
  404.html-redirect-to-index trick if you want to keep clean URLs there.

## Stack

- [Vite](https://vite.dev) + React
- [React Router](https://reactrouter.com) for the home page / project detail page split
- [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`)
- [Framer Motion](https://motion.dev) for scroll reveals and micro-interactions
- [Three.js](https://threejs.org) via [`@react-three/fiber`](https://r3f.docs.pmnd.rs) for the 3D journey background
- [lucide-react](https://lucide.dev) + [react-icons](https://react-icons.github.io/react-icons) for icons
