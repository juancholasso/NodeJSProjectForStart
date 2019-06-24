/**
 * Environment
 */
require('./app/config/env');
console.log(process.env.MAIL_USER)
console.log(process.env.MAIL_PASSWORD)
/**
 * Database Connection
*/
var sequelize = require('./app/config/dbconn.js');

/**
 * Libraries
*/
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const flash = require('express-flash-notification');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const fileupload = require('express-fileupload');
const Passport = require('./app/middlewares/Passport');

/**
 * Express Configuration
*/
app.use(express.static(__dirname+'/app/public')); //Public folder
app.set('views', path.resolve('app/views')); //Set folder views
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //For api-rest
app.use(cookieParser()); //Sessions
app.set('view engine', 'ejs');//Engine templates
app.use(fileupload()); //Package for upload files
app.use(/^\/(?!api).*/,session({ //Configure Session except /api/* routes
  key: 'user_sid',
  secret: 'Po1MLn123Xc91YagH23tsibc11PhNNc1na',
  resave: true,
  saveUninitialized: false,
  cookie: {
      expires: 6000000
  },
  store: new SequelizeStore({
    db: sequelize
  }),
}));
app.use(/^\/(?!api).*/,flash(app)); //For sweetalerts except /api/*


/**
 * Exporting variables for use with routes
*/
module.exports.express = express;
module.exports.app = app;

/**
 * Models
*/
require('./app/models/Permission.js');
require('./app/models/Role.js');
require('./app/models/User.js');
require('./app/models/UsersHasRoles.js');
require('./app/models/RolesHasPermissions.js');

/**
 * Start Server
 */
async function startServer(){
  try{
    await require('./app/models/Relationships.js');
    await sequelize.sync();
    
    var routerWeb = require('./app/routes/routes.js').router;
    app.use('/', routerWeb);

    //Start only on the first time deploying or when user admin was delete
    // await require('./config/StartData.js');

    app.listen(process.env.PORT, function () {
      console.log(`App listening on port ${process.env.PORT}!`);
    })

  }
  catch(err){
    console.error(err);
  }
}

//Main Method --
startServer();
