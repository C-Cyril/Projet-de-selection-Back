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

//Envoie la liste de toutes les blagues
exports.toutesLesBlagues =  async () => {
    //return JSON.stringify(blague.findAll());
    //return blague.findAll();
    /*
    const users = blague.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log('All users:', JSON.stringify(users, null, 2));
    */
   
   //const resultat = async () => {
    try {
        const blagues = await blague.findAll();  
        return blagues;
    }
    catch (error) {
        console.error('Erreur');
        throw error;
    }
   
};

//Ajoute une blague dans la BDD
exports.ajouteBlague = (pQuestion, pReponse) => {
    try {
        blague.create({question: pQuestion, reponse: pReponse});
        blague.sync();
    }
    catch {
        console.error('Erreur');
        throw error;
    }
    
};

//Envoie une blague dont l'id correspond à celui passé en paramètre
exports.blagueParId = async (pId) => {
    try {
        const resultat = await blague.findByPk(pId);
        return resultat;
    }
    catch (error) {
        console.error('Erreur');
        throw error;
    }
};

exports.blagueAleatoire = async () => {
    try {
        const { count, rows } = await blague.findAndCountAll();

        //Création d'une valeur aléatoire
        const min = 1;
        const max = (count+1);
        console.log(max);
        var valAleatoire = (Math.floor(Math.random() * (max - min) + min));
        console.log(valAleatoire);

        return (this.blagueParId(valAleatoire));
    }
    catch (error) {
        console.error('Erreur');
        throw error;
    }
};


/*
console.log(JSON.stringify(blague.findAll({attributes: ['id']})));
console.log('test');
*/

//module.exports = blague;