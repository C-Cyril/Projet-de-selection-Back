const express = require("express");
//import express from "express";
const sequelize = require("./BDD/BDD");
//import sequelize from "./BDD/BDD.js";

const Blague = require("./Modele/blague");
//import Blague from "./Modele/blague.js";

/*
sequelize.sync().then(result => {
    console.log(result);
    console.log("PATATE");
}).catch(erreur => {
    console.log(erreur);
});
*/

/*
//Cela a inséré une ligne (id 0) dans la BDD
Blague.create({id: 0, question: "Quelle est la femelle du hamster ?", reponse: "L’Amsterdam"});
Blague.sync();
*/

//SELECT * FORM ...
const users = Blague.findAll();


//console.log(users.every(user => user instanceof User)); // true
console.log('All users:', JSON.stringify(users, null, 2));


const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('hello world')
})

//Envoi toutes les blagues
app.get('/blagues', (req, res) => {
	res.send('toutes les blagues')
})

//Envoi une blague aléatoire
app.get('/blagues/random', (req, res) => {
	res.send('blague aléatoire');
})

//Envoi une blague correspondant à son id
app.get('/blagues/:id', (req, res) => {
	res.send('blague par id');
})


app.listen(PORT, () => {
	console.log('My app is running on URL https://localhost:'+PORT);
});