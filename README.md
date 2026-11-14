# Houtarou Oreki Tribute Website

A fan-made character tribute website dedicated to **Houtarou Oreki** from the anime *Hyouka*. This project was created as an academic final project for **BS Computer Science – Second Year, First Semester** at Cavite State University – Bacoor City Campus.

<p align="center">
  <a href="https://jms-rnld-dgi.github.io/Character-Tribute-Website-Project/"><strong>Visit the Live Website</strong></a>
  ·
  <a href="https://github.com/jms-rnld-dgi/Character-Tribute-Website-Project">View Source Code</a>
</p>

![Project status](https://img.shields.io/badge/status-academic%20project-blue)
![HTML](https://img.shields.io/badge/HTML5- structure-orange)
![CSS](https://img.shields.io/badge/CSS3-styling-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-yellow)
![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-222)

---

## About the Project

The website introduces Houtarou Oreki, the observant and energy-conscious protagonist of *Hyouka*. It presents character information and selected media in a single-page, responsive experience.

The project was built to practice foundational front-end development: semantic HTML, styling with CSS, DOM manipulation, event handling, responsive layouts, and static-site deployment.

## Features

- **Character introduction** – overview of Houtarou Oreki and his energy-conservation philosophy.
- **Media gallery** – images, series screenshots, and character quotes.
- **Theme switcher** – toggle between light and dark themes.
- **Responsive navigation** – navigation menu designed for desktop and mobile screens.
- **Video content** – embedded trailer and a local video clip.
- **Optional background music** – user-controlled audio playback.
- **Interactive details** – gallery tabs, scroll effects, and back-to-top control.
- **Static hosting** – deployable through GitHub Pages using GitHub Actions.

## Built With

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure and content |
| CSS3 | Layout, styling, transitions, and responsive design |
| JavaScript (Vanilla) | Navigation, theme toggle, tabs, and interactions |
| Google Fonts | Typography |
| Material Symbols | Interface icons |
| GitHub Pages | Static website hosting |
| GitHub Actions | Automated deployment |

No framework, package manager, or build step is required.

## Project Structure

```text
Character-Tribute-Website-Project/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── audio/
├── images/
│   └── assets/
├── screenshots/
├── video/
├── index.html
├── style.css
├── script.js
├── .nojekyll
└── README.md
```

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/jms-rnld-dgi/Character-Tribute-Website-Project.git
   ```

2. Open the project folder:

   ```bash
   cd Character-Tribute-Website-Project
   ```

3. Start a local static server (Python required):

   **Windows:**
   ```powershell
   py -m http.server 8000
   ```

   **macOS / Linux:**
   ```bash
   python3 -m http.server 8000
   ```

4. Visit [http://localhost:8000](http://localhost:8000).

You can also open `index.html` directly in a browser. A local server is recommended for more consistent media behavior.

## Deployment (GitHub Pages)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To enable or verify deployment:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Open the **Actions** tab and run **Deploy static site to GitHub Pages** (or push a commit to `main`).
4. Wait for both the build and deploy jobs to complete successfully.
5. Open the live site: [https://jms-rnld-dgi.github.io/Character-Tribute-Website-Project/](https://jms-rnld-dgi.github.io/Character-Tribute-Website-Project/).

Every new push to `main` triggers a deployment.

## Screenshots

Add or update project preview images in the `screenshots/` directory. You may embed selected screenshots here once the final presentation captures have been prepared.

## Academic Information

- **Project:** Character Tribute Website – Houtarou Oreki (*Hyouka*)
- **Course:** Bachelor of Science in Computer Science
- **Year / Term:** Second Year, First Semester
- **Institution:** Cavite State University – Bacoor City Campus
- **Developer:** James Ronald Daguio

## Credits and Disclaimer

This is an independently developed, non-commercial fan tribute and is not affiliated with or endorsed by the creators, publishers, or licensors of *Hyouka*. Character names, series references, and media belong to their respective owners. Credit and usage rights for third-party assets remain with their original creators; use assets only where you have permission.

---

Made for learning and as an academic web development project.
