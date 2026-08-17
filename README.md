# Courts Diez · Landingpage

Landingpage für die Sportanlage **Courts Diez** (Padel & Tennis), ausgeliefert über einen schlanken Node.js/Express-Server.

## Voraussetzungen
- Node.js **18+**

## Installieren & Starten
```bash
npm install
npm start
```
Danach im Browser öffnen: **http://localhost:3000**

Der Port lässt sich per Umgebungsvariable setzen:
```bash
PORT=8080 npm start
```

## Projektstruktur
```
.
├── server.js                     Express-Server (liefert HTML + Assets aus)
├── package.json
├── Courts Diez Landingpage.html  Einstiegsseite
├── components/                   React-Komponenten (JSX, via Babel im Browser)
│   ├── ui.jsx
│   ├── sections-top.jsx
│   ├── sections-bottom.jsx
│   ├── tweaks-panel.jsx
│   └── app.jsx
└── assets/
    ├── courts-diez-logo.png      Transparentes Logo
    └── img/                      Szenenbilder (austauschbar)
```

## Inhalte austauschen
- **Bilder:** Dateien in `assets/img/` durch echte Fotos ersetzen (gleiche Dateinamen beibehalten) oder die `src`-Pfade in `components/sections-top.jsx` / `sections-bottom.jsx` anpassen.
- **Kontaktdaten / Öffnungszeiten / Playtomic-Link:** in den Komponenten unter `components/` editieren.

## Hinweis zur Produktion
Aktuell wird React + Babel direkt im Browser geladen (ideal für schnelle Iteration). Für einen Produktiv-Build empfiehlt sich ein Bundler (z. B. Vite), der die JSX-Dateien vorab kompiliert — bei Bedarf richte ich das ein.
