const express = require("express");
//import express from "express";
//const sequelize = require("./BDD/BDD");
//import sequelize from "./BDD/BDD.js";
const sequelize = require("./BDD/BDD");
const Blague = require("./Modele/blague");
//import Blague from "./Modele/blague.js";

/*
//Cela a inséré une ligne (id 1) dans la BDD
Blague.create({id: 1, question: "Que dit un oignon quand il se cogne ?", reponse: "Aïe"});
Blague.sync();
*/


//console.log(users.every(user => user instanceof User)); // true
//console.log('All users:', JSON.stringify(users, null, 2));

const app = express();

//Insère une blague dans la BDD, id automatique
app.get('/ajoute/:question/:reponse', (req, res) => {
  Blague.ajouteBlague(req.params.question, req.params.reponse);
  res.send('Blague ajoutée');
});

//Envoi toutes les blagues
app.get('/blagues', async (req, res) => {
  //var resultat = new Array;
  //resultat = await Blague.toutesLesBlagues();
  res.send(await Blague.toutesLesBlagues());
});

//Envoi une blague aléatoire PAS FAIT
app.get('/blagues/random', async (req, res) => {
	res.send(await Blague.blagueAleatoire());
});

//Envoi une blague correspondant à son id PAS FAIT
app.get('/blagues/:id', async (req, res) => {
	res.send(await Blague.blagueParId(req.params.id));
});

//Lance le serveur API
const PORT = 3000;
app.listen(PORT, () => {
	console.log('My app is running on URL https://localhost:'+PORT);
});