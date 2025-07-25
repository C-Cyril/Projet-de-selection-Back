const Sequelize = require("sequelize");
const sequelize = require("../BDD/BDD");

/**
 * @swagger
 * components:
 *   schemas:
 *     blague:
 *       type: object
 *       required:
 *         - id
 *         - question
 *         - reponse
 *       properties:
 *         id:
 *           type: integer
 *           description: Id de la blague, généré automatiquement.
 *         question:
 *           type: string
 *           description: La question posée pour cette blague.
 *         reponse:
 *           type: string
 *           description: La réponse à la question posée dans cette blague.
 *         createdAt:
 *           type: string
 *           format: date
 *           description: La date à laquelle la blague à été créée, générée automatiquement.
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: La date à laquelle la blague à été modifiée, générée automatiquement.
 *       example:
 *         id: 2
 *         question: Que dit un oignon quand il se cogne ?
 *         reponse: Aïe
 *         createdAt : 2025-06-30T10:39:15.813Z
 *         updatedAt : 2025-06-30T10:39:15.813Z
 *     blagueAAjouter:
 *       type: object
 *       required:
 *         - question
 *         - reponse
 *       properties:
 *         question:
 *           type: string
 *           description: La question posée pour cette blague.
 *         reponse:
 *           type: string
 *           description: La réponse à la question posée dans cette blague.
 *       example:
 *         question: Que dit un oignon quand il se cogne ?
 *         reponse: Aïe
 */

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
