# Blog

A minimalist, zero-dependency blog. Just HTML and CSS.

## Features

- **Simple**: Plain HTML with inline CSS, no build process
- **Fast**: No JavaScript, no external dependencies, instant load times
- **Minimal**: Focused on content, not distractions
- **Mobile-friendly**: Responsive design that works on all devices
- **Easy to deploy**: One-click deployment to GitHub Pages

## Design

- Clean typography with system fonts
- 680px content width for readability
- White background with dark text
- Blue links (#0066cc)
- 1.65 line height for comfortable reading

## Quick Start

```bash
bash deploy.sh
```

This will:
1. Initialize a git repository
2. Commit your files
3. Push to GitHub
4. Show you your live blog URL

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

## File Structure

```
blog/
├── index.html                          # Homepage
├── posts/                              # Blog posts
│   ├── hello-world.html
│   ├── how-to-build-things.html
│   └── text-viewer-component.html
├── README.md                           # This file
└── QUICKSTART.md                       # Deployment guide
```

## Writing Posts

Each post is a standalone HTML file. Copy an example post and edit:
- The `<title>` tag
- The `<h1>` heading  
- The date
- The article content

Then link to it from `index.html`.

## Customization

All styling is inline CSS in the `<style>` tags. Easy to modify:
- Colors (background, text, links)
- Layout (width, padding, spacing)
- Typography (fonts, size, line height)

No preprocessors, no build steps. Edit HTML and push.

## Deployment

Works with GitHub Pages, Netlify, Vercel, or any static host. GitHub Pages is included in the deploy script.

```bash
git push origin main
```

That's it.

## Design Inspiration

This blog is inspired by minimalist design blogs like theleo.zone, stripped down to the essentials. Focus on writing, not design.

---

**Getting started?** See [QUICKSTART.md](QUICKSTART.md).
