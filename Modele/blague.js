const Sequelize = require("sequelize");
//const sequelize = require("../BDD/ListeBlagues.db");
const sequelize = require("../BDD/BDD");

//création d'un modele "blague" pointé par "blague"
const blague = sequelize.define('blagues', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allownull: false,
        primaryKey: true,
    },
    question: {
        type: Sequelize.STRING,
        allownull: false,
    },
    reponse: {
        type: Sequelize.STRING,
        allownull: false,
    },
});

blague.sync();

//sequelize.sync();
//console.log(blague === sequelize.models.blagues);

module.exports = blague;