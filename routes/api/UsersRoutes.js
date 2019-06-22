var express = require('express'), router = express.Router()
var passport = require('passport');
var authmiddle = require('../../middlewares/Authentication.js');
const UserService = require('../../services/UserService');

var userService = new UserService;

router.use('/users', passport.authenticate('jwt', { session: false }));
router.use('/users', authmiddle.decodeToken);
router.post('/users', (req, res) => { userService.getUsersApi(req, res) });

module.exports = router
