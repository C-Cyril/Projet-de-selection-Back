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
//Créé dans la BDD la table "blagues" (et la BDD) indiquée ci-dessus si elle n'éxiste pas déjà
blague.sync();

//Envoie la liste de toutes les blagues
exports.toutesLesBlagues =  async () => {
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

//Envoie une blague aléatoire
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
