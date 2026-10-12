# PAP Customers

Application pédagogique de suivi clients, projet 5 OpenClassrooms, option A (entreprise fictive). Next.js, React, TypeScript, Tailwind CSS, SQLite et Prisma.

## Démarrer en local

Utiliser **Node.js 24 LTS** de préférence, ou Node.js 22 à partir de **22.18**. Dans le dossier du projet :

```bash
npm ci
npm run db:setup
npm run dev
```

Ouvrir [localhost:3000](http://localhost:3000), puis la page Clients.

`db:setup` prépare le client Prisma, crée le fichier SQLite s’il manque, applique les migrations puis remplit la base avec les exemples. Cette préparation du fichier évite une erreur du moteur de migration sur une base absente.

## D’où viennent les données ?

Le JSON sert à remplir initialement la base SQLite locale `prisma/dev.db`, ignorée par Git. La liste et les fiches lisent ensuite la base via Prisma, en gardant les mêmes écrans. Le remplissage initial, appelé *seed*, peut être relancé : il ajoute les éléments absents sans écraser ceux qui existent déjà.

Les exemples contiennent 9 clients et 20 commandes. Chiffre d’affaires, nombre de commandes, panier moyen et dernière commande sont calculés à partir des commandes.

L’accueil et la page Clients suivis restent statiques. L’application ne sauvegarde pas encore de modification du suivi.

## Commandes utiles

```bash
npm run db:studio  # Explorer la base avec Prisma Studio
npm run lint      # Vérifier le code
npm run build     # Compiler et vérifier les types
npm run test:db   # Tester une base temporaire, sans toucher à vos données
```

Les tests vérifient la création à neuf, les liens client-commandes, le remplissage sans doublons ni écrasement et la conservation des données après reconnexion.

Pour héberger cette version, le fichier SQLite nécessite un stockage persistant. Un disque éphémère de fonction serverless ne conserve pas durablement la base.

Configuration inspirée du [guide FishEye d’OpenClassrooms](https://github.com/OpenClassrooms-Student-Center/React-P5-fisheye/blob/main/README.md), adaptée avec le [guide SQLite de Prisma 7](https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite).
