const Sequelize = require('sequelize');
var sequelize = require('../conf/dbconn.js');

// Model publication
var publication = sequelize.define('publication', {
    id_publication: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    found_place: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    object_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('publication table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export publication model for use in other files.
module.exports = publication;