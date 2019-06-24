const Sequelize = require('sequelize');
var sequelize = require('../conf/dbconn.js');

//Model type_publication
var type_publication = sequelize.define('type_publication', {
    id_type_publication: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    type_publication: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('type_publications table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export type_publications model for use in other files.
module.exports = type_publications;