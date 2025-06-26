const sequelize = require("./BDD/BDD");

const Blague = require("./Modele/blague");

sequelize.sync().then(result => {
    console.log(result);
}).catch(erreur => {
    console.log(erreur);
});
