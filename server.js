const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes d'aceuil
app.get('/', (req, res) => {
  res.render('index');
});

// Route formation
app.get('/formation', (req, res) => {
  res.render('formation', {
    ogTitle: 'Formation IA - Portfolio BOUKALA',
    ogDescription: 'Inscrivez-vous à notre formation en Intelligence Artificielle',
    ogImage: 'https://kodesi-portfolio.vercel.app/assets/images/formation_v2.png',
    ogUrl: 'https://kodesi-portfolio.vercel.app/formation',
    twitterTitle: 'Formation IA - Portfolio BOUKALA',
    twitterDescription: 'Inscrivez-vous à notre formation en Intelligence Artificielle',
    twitterImage: 'https://kodesi-portfolio.vercel.app/assets/images/formation_v2.png'
  });
});

// Route manifesto
app.get('/manifesto', (req, res) => {
  res.render('manifesto');
});

// Route stack
app.get('/stack', (req, res) => {
  res.render('stack');
});

// Route projets
app.get('/projets', (req, res) => {
  res.render('projets');
});

app.get('/propos', (req, res) => {
  res.render('propos');
});


app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
})