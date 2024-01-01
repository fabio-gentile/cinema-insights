
# Projet personnel :  Cinema Insights

## Introduction

Ce site a été créé de manière autodidacte dans le but de développer des compétences dans l'utilisation du framework Vue.js. Il offre la possibilité de découvrir les dernières créations ainsi que des détails sur les films, séries, acteurs et réalisateurs.

## Technologies 

Le site repose sur plusieurs technologies :

- **Vue.js** `Composition API`
- **Tailwind CSS** 

### Librairies externes utilisées

- [Tanstack Query](https://github.com/tanstack/query) Une bibliothèque de gestion d'état pour les requêtes.
-  [Swiperjs](https://github.com/nolimits4web/swiper) Une bibliothèque de carousels et de sliders.

## Page d'Accueil

La page d'accueil est dynamique, affichant les contenus à la mode actuellement au cinéma :

- **Trending** : Découvrez ce qui fait sensation en ce moment.
- **Stars** : Explorez les acteurs et réalisateurs en vogue.
-  **Now in theatres** : Films projetés au cinéma.

## Page Movies

Vous y retrouverez les films populaires dernièrement. Il y a également des filtres applicables pour affiner les résultats.

## Page Tv Shows

Vous y retrouverez les séries populaires dernièrement. Il y a également des filtres applicables pour affiner les résultats.

## Exploration

- **Recherche Rapide** : Utilisez la barre de recherche pour trouver des films ou séries.

## Fonctionnalités Avancées

### Pages Personnalisées

- **Stars Individuelles** : Cliquez sur une star pour accéder à sa page personnelle. Découvrez sa biographie, l'ensemble de ses travaux et ses projets les plus marquants.
- **Films et Séries Individuels** : Explorez les détails, les bandes-annonces, les genres et les recommandations pour chaque film ou série. Pour les séries, accédez également aux informations sur les saisons.

### Modes d'Affichage

- **Dark et Light Mode** : Choisissez le mode d'affichage qui correspond à votre préférence.

## Gestion des Données

- Les données sont fournies par l'API gratuite de [The Movie Database (TMDb)](https://developer.themoviedb.org/docs).
- Les requêtes sont gérées via un serveur **Fastify** pour cacher ma clef api. Le serveur est déployé sur un serveur gratuit provenant de [Fly.io](https://fly.io/).

---
**Note :** Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB. Les images utilisées ne sont pas la propriété de l'auteur de ce projet et sont utilisées à des fins illustratives uniquement.
