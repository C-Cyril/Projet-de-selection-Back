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
  apis: ["./modele/*.js"],
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

//Insère une blague dans la BDD, id automatique
app.post('/ajouter', (req, res) => {
  Blague.ajouteBlague(req.body.question, req.body.reponse);
  res.send(req.body);
});

//Envoi toutes les blagues
app.get('/blagues', async (req, res) => {
  //var resultat = new Array;
  //resultat = await Blague.toutesLesBlagues();
  res.send(await Blague.toutesLesBlagues());
});

//Envoi une blague aléatoire
app.get('/blagues/random', async (req, res) => {
	res.send(await Blague.blagueAleatoire());
});

//Envoi une blague correspondant à son id
app.get('/blagues/:id', async (req, res) => {
	res.send(await Blague.blagueParId(req.params.id));
});

//Lance le serveur API
const PORT = 10000;
app.listen(PORT, () => {
	console.log('My app is running on port '+PORT);
});
