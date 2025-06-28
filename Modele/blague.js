const Sequelize = require("sequelize");
const sequelize = require("../BDD/BDD");

//création d'un modele "blagues" pointé par "blague"
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
//Créé dans la BDD la table "blagues" indiquée ci-dessus si elle n'éxiste pas déjà
blague.sync();

//Envoie la liste de toutes les blagues NE FONCTIONNE PAS
exports.toutesLesBlagues = () => {
    //return JSON.stringify(blague.findAll());
    //return blague.findAll();
    const users = blague.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log('All users:', JSON.stringify(users, null, 2));
};

//Ajoute une blague dans la BDD
exports.ajouteBlague = (pQuestion, pReponse) => {
    blague.create({question: pQuestion, reponse: pReponse});
    blague.sync();
};

exports.blagueParId = (pId) => {
    //const resultat = blague.findOne({where: {id: pId}});
    const resultat = blague.findByPk(pId);
    if (resultat === null) {
        return 'Error : not Found';
    }
    else {
        return resultat;
    }
};


/*
console.log(JSON.stringify(blague.findAll({attributes: ['id']})));
console.log('test');
*/

//module.exports = blague;