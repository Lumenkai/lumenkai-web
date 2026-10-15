# Lumenkai website

Landing page + contact form (English / Spanish) built with React and Vite, managed with [Bun](https://bun.sh).

## Run it

```bash
bun install      # install dependencies
bun run dev      # dev server at http://localhost:5173
bun run build    # production build in /dist
bun run preview  # preview the production build
```

## Structure

```
lumenkai/
├── index.html          # page shell, title, fonts, favicon
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # whole site: texts (EN/ES), pages, styles
```

## Things to know

- **Contact form:** sends to `juanmanuel@lumenkai.net` through FormSubmit.co (no backend).
  The first submission triggers an activation email, click the link once.
- **Languages:** all texts live in the `T` object at the top of `src/App.jsx` (`en` and `es`).
- **Prices:** "from €400" and "from €100 / month" are test hypotheses, adjust them before publishing.
- **Images:** the photos are random placeholders from picsum.photos. Replace them with your own.
- **Routing:** the contact page uses plain React state (no router library).
