const Sequelize = require('sequelize');
var sequelize = require('../config/dbconn.js');

// Model User
var RolesHasPermissions = sequelize.define('RolesHasPermissions', {
    idrol: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    idpermission: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = RolesHasPermissions;

