const Sequelize = require('sequelize');
var sequelize = require('../config/dbconn.js');

// Model User
var User = sequelize.define('Users', {
    iduser: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    iddocument: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = User;

