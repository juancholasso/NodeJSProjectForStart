const Sequelize = require('sequelize');
var sequelize = require('../conf/dbconn.js');

//model type_object
var type_object = sequelize.define('type_object', {
    id_type_object: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    type_object: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('type_object table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export type_object model for use in other files.
module.exports = type_object;