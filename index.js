const express = require("express");
const sequelize = require("./BDD/BDD");
const Blague = require("./Modele/blague");

//Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
//pour le POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Descriptif de l'API via Swagger
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API Node js de blagues Carambar",
      version: "0.9.0",
      description:
        "API simple faite avec Node js, Express, Sequelize & SQLite.",
    },
    servers: [
      {
        url: "https://projet-de-selection-back.onrender.com",
      },
    ],
  },
  apis: ["./modele/*.js", "./*.js"],
};
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

//Autorise mon front-end à utiliser cette API
const cors = require("cors");
const corsOptions = {
  //Pour autoriser seulement mon front-end : NE FONCTIONNE PAS
  //origin:"https://c-cyril.github.io/Projet-de-selection-Front/",
  //Pour autoriser toutes les origines à accéder à cette API
  origin: "*",
  methods: "GET,HEAD,POST",};
app.use(cors(corsOptions));

/**
 * @swagger
 * tags:
 *   name: Blagues
 *   description: API qui gère les blagues
 * /ajouter:
 *   post:
 *     summary: Créé une nouvelle blague dans la BDD.
 *     tags: [Blagues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/blagueAAjouter'
 *     responses:
 *       200:
 *         description: La blague à été créée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blagueAAjouter'
 *       500:
 *         description: Erreur serveur.
 */
//Insère une blague dans la BDD, id automatique
app.post('/ajouter', (req, res) => {
  Blague.ajouteBlague(req.body.question, req.body.reponse);
  res.send(req.body);
});

/**
 * @swagger
 * tags:
 *   name: Blagues
 *   description: API qui gère les blagues
 * /blagues:
 *   get:
 *     summary: Affiche toutes les blagues
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: La liste des blagues au format Json.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blague'
 *       500:
 *         description: Erreur serveur.
 */
//Envoi toutes les blagues
app.get('/blagues', async (req, res) => {
  //var resultat = new Array;
  //resultat = await Blague.toutesLesBlagues();
  res.send(await Blague.toutesLesBlagues());
});

/**
 * @swagger
 * tags:
 *   name: Blagues
 *   description: API qui gère les blagues
 * /blagues/random:
 *   get:
 *     summary: Affiche une blague au hasard.
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: La blague au format Json.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blague'
 *       500:
 *         description: Erreur serveur.
 */
//Envoi une blague aléatoire
app.get('/blagues/random', async (req, res) => {
	res.send(await Blague.blagueAleatoire());
});

/**
 * @swagger
 * tags:
 *   name: Blagues
 *   description: API qui gère les blagues
 * /blagues/{id}:
 *   get:
 *     summary: Affiche une blague dont l'id correspond à celui passé en paramètre.
 *     tags: [Blagues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'id de la blague.
 *     responses:
 *       200:
 *         description: La blague au format Json.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/blague'
 *       404:
 *         description: La blague n'a pas été trouvée.
 */
//Envoi une blague correspondant à son id
app.get('/blagues/:id', async (req, res) => {
	res.send(await Blague.blagueParId(req.params.id));
});

//Lance le serveur API
const PORT = 10000;
app.listen(PORT, () => {
	console.log('My app is running on port '+PORT);
});
