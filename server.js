// server.js — statischer Express-Server für die Courts Diez Landingpage
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// Startseite
app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

// Statische Dateien (HTML, components/, assets/, ...)
app.use(
  express.static(ROOT, {
    extensions: ['html'],
    setHeaders: (res, filePath) => {
      // JSX als JavaScript ausliefern, damit Babel-im-Browser sie laden kann
      if (filePath.endsWith('.jsx')) {
        res.setHeader('Content-Type', 'text/babel; charset=utf-8');
      }
    },
  })
);

// 404 → zurück zur Startseite
app.use((req, res) => {
  res.status(404).sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  Courts Diez läuft auf  http://localhost:${PORT}\n`);
});
