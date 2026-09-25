# Joyeux anniversaire — 20 ans, 20 cadeaux

Site React (Vite) pour ses 20 ans : mot d'anniversaire, galerie photo, vœux,
20 cadeaux à ouvrir un par un, et une lettre pour finir.

## Lancer le site

```bash
npm install
npm run dev
```

Puis ouvre l'adresse affichée (en général http://localhost:5173).

## Personnaliser

Tout le contenu est dans **`src/data.js`** : prénom, signature, photos,
mot, vœux, cadeaux (et leurs raisons), lettre de fin.

Photos : mets les fichiers dans `public/photos/`, puis dans `src/data.js` :
`{ src: "/photos/photo1.jpg", legende: "..." }`.

## Structure

```
src/
  data.js              ← le contenu à modifier
  App.jsx              ← l'ordre des sections
  styles.css           ← couleurs et mise en page (variables en haut)
  components/
    Hero.jsx           ← « Joyeux anniversaire » + le grand 20
    Mot.jsx            ← le petit mot
    Photos.jsx         ← la galerie Polaroid
    Voeux.jsx          ← les vœux
    Cadeaux.jsx        ← la grille des 20 paquets + progression
    GiftModal.jsx      ← la carte qui s'ouvre sur un cadeau
    Lettre.jsx         ← la lettre de fin
    Confetti.jsx       ← les confettis
```

## Mettre en ligne

```bash
npm run build
```

Le dossier `dist/` peut être déposé tel quel sur Netlify (glisser-déposer sur
app.netlify.com/drop), Vercel ou GitHub Pages pour avoir un lien à lui envoyer.
# reine20birthday
