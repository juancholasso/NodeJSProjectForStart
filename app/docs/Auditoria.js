const Sequelize = require('sequelize');
var sequelize = require('../conf/dbconn.js');

//model audit
var audit = sequelize.define('audit', {
    id_audit: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    entry_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    out_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    name_person_found: {
        type: Sequelize.STRING,
        allowNull: false
    },
    document_person_found: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email_person_found: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name_person_claims: {
        type: Sequelize.STRING,
        allowNull: false
    },
    document_person_claims: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email_person_claims: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('audit table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export audit model for use in other files.
module.exports = audit;