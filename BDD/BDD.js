const Sequelize = require('sequelize');

//Connection à la base de donnée
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './ListeBlagues.sqlite'
});

/*
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
  */

module.exports = sequelize;