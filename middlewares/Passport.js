import AuthenticationController from '../controllers/AuthenticationController';
import UserController from '../controllers/UserController';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User.js');

const authenticationController = new AuthenticationController;
const userController = new UserController;

//Middleware for login api
passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
}, 
async (email, password, done) => {
    try{
        let user = await userController.getUserByEmail(email);
        if (user == null) {
            return done(null, false);
        }
        else if(await authenticationController.checkEmailAndPassword(email, password)){
            return done(null, user);
        }
        return done(null, false);
    }
    catch(err){
        console.log(err)
        return done(err)
    }
}));

//Middleward guard for routes on user authenticated
//Este middleware protege las rutas de un usuario autenticado
passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.SEED
    },
    function (jwtPayload, done) {
        return done(null, true);
    }
));