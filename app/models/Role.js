const Sequelize = require('sequelize');
var sequelize = require('../config/dbconn.js');

// Model Rol usuario
var Role = sequelize.define('Roles', {
    idrol: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    rol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export RolUser model for use in other files.
module.exports = Role;



