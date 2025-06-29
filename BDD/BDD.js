const Sequelize = require('sequelize');

//Connection à la base de donnée
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './ListeBlagues.sqlite'
});

module.exports = sequelize;