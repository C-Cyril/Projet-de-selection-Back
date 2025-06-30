const express = require("express");
const sequelize = require("./BDD/BDD");
const Blague = require("./Modele/blague");

const app = express();
//pour le POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Autorise mon front-end à utiliser cette API

const cors = require("cors");
const corsOptions = {
  //origin:"https://c-cyril.github.io/Projet-de-selection-Front/",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
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
