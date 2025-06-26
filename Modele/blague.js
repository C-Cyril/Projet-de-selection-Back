const Sequelize = require("sequelize");
const sequelize = require("../BDD/ListeBlagues.db");

const Blague = sequelize.define("blague", {
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

module.exports = Blague;