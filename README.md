# 🏎️ F1 Dashboard

Dashboard web F1 — données en temps réel via l'API [Jolpica](https://api.jolpi.ca) (gratuite, sans clé API).

---

## 📁 Structure du projet

```
f1-dashboard/
├── index.html              # Point d'entrée HTML
├── css/
│   └── main.css            # Styles globaux
├── js/
│   ├── main.js             # Boot, état global, routage des onglets
│   ├── config.js           # Constantes (couleurs écuries, drapeaux, saisons)
│   ├── api.js              # Toutes les fonctions d'appel à l'API F1
│   ├── utils.js            # Fonctions utilitaires partagées (rendu, format…)
│   └── tabs/
│       ├── calendar.js     # Onglet Calendrier
│       ├── drivers.js      # Onglet Classement Pilotes
│       ├── constructors.js # Onglet Classement Constructeurs
│       ├── results.js      # Onglet Résultats de course
│       └── qualifying.js   # Onglet Qualifications
└── README.md
```

---

## 🚀 Lancer le projet en local

> ⚠️ Les modules ES6 nécessitent un serveur HTTP — ouvrir `index.html` directement
> en double-cliquant ne fonctionnera **pas** (erreur CORS).

### Option 1 — Python (aucune installation)
```bash
cd f1-dashboard
python3 -m http.server 8080
# Ouvrir http://localhost:8080
```

### Option 2 — Node.js / npx
```bash
cd f1-dashboard
npx serve .
# Ouvrir http://localhost:3000
```

### Option 3 — Extension VS Code
Installer **Live Server** → clic droit sur `index.html` → *Open with Live Server*

---

## 🌐 Déploiement en production

### Netlify Drop (le plus simple)
1. Aller sur [netlify.com/drop](https://netlify.com/drop)
2. Glisser-déposer le dossier `f1-dashboard/`
3. C'est en ligne ✅

### Vercel
```bash
npm i -g vercel
cd f1-dashboard
vercel
```

### GitHub Pages
1. Pusher le dossier sur un repo GitHub
2. *Settings → Pages → Deploy from branch → main*

### Serveur classique (nginx / Apache)
Copier le dossier sur le serveur et pointer le vhost vers `index.html`.
Aucune dépendance serveur — c'est du HTML/CSS/JS pur.

---

## ➕ Ajouter un nouvel onglet

1. Créer `js/tabs/mon-onglet.js` avec une fonction `renderMonOnglet(season)`
2. L'importer dans `js/main.js`
3. Ajouter le `case` dans `renderCurrentTab()`
4. Ajouter le bouton dans `index.html`

---

## 🔌 API utilisée

**Jolpica-Ergast F1 API** — `https://api.jolpi.ca/ergast/f1`

| Endpoint                                   | Usage                    |
|--------------------------------------------|--------------------------|
| `/{season}.json`                           | Calendrier de la saison  |
| `/{season}/driverStandings.json`           | Classement pilotes       |
| `/{season}/constructorStandings.json`      | Classement constructeurs |
| `/{season}/{round}/results.json`           | Résultats d'une course   |
| `/{season}/{round}/qualifying.json`        | Qualifications           |

Documentation complète : [jolpi.ca](https://api.jolpi.ca)
