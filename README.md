# Houtarou Oreki Tribute

A static fan tribute to Houtarou Oreki from *Hyouka*, built with HTML, CSS, and vanilla JavaScript.

## Features

- Responsive layout with light and dark themes
- Character profile, image gallery, quotes, and screenshots
- Embedded video and optional background music
- GitHub Pages deployment workflow

## Project structure

```text
.
├── index.html
├── style.css
├── script.js
├── images/
├── screenshots/
├── audio/
├── video/
└── .github/workflows/deploy.yml
```

## Run locally

From the project directory, start a static web server:

```powershell
py -m http.server 8000
```

Then open http://localhost:8000.

No build step or package installation is required.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` deploys the repository root whenever a commit is pushed to `main`.

In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Then run or re-run the workflow from the **Actions** tab.