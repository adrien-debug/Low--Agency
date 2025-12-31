# Low Agency — One-page (sections + menu scroll)

Ce dossier contient une landing **one-page** avec un **menu sticky** qui scrolle vers des **sections** :
Accueil, Services, Réalisations, À propos, Contact (+ CTA “Appel découverte”).

## Fichiers

- `index.html` : la page unique et tout le contenu (placeholders à personnaliser)
- `assets/styles.css` : styles (responsive)
- `assets/main.js` : interactions (menu mobile, section active, formulaire)

## Lancer en local

Option la plus simple :

- Ouvre `index.html` dans ton navigateur

Option recommandée (si tu veux éviter certaines restrictions du navigateur sur les fichiers locaux) :

```bash
cd "/Users/adrienbeyondcrypto/Desktop/Low Agency"
python3 -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## À personnaliser (important)

Dans `index.html` :

- Lien Calendly : remplace `https://calendly.com/ton-lien/appel-decouverte`
- WhatsApp : remplace `https://wa.me/00000000000` par ton numéro (ex: `33612345678`)
- Email : remplace `hello@lowagency.fr`
- Témoignages / études de cas / logos : remplace les placeholders
- Mentions légales : ajoute un lien réel (ou une section)

Dans `assets/main.js` :

- Email `to` du `mailto:` : remplace `hello@lowagency.fr` si nécessaire


