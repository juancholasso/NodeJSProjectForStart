var express = require('express'), router = express.Router()

var authmiddle = require('../../middlewares/Authentication.js');
var AuthenticationService = require('../../services/AuthenticationService.js');

var authenticationService = new AuthenticationService;
let routes = [];

router.get('/', (req, res, next) => { res.redirect('/home') });
routes.push({path:'/',name:'root'})

router.get('/login', (req, res, next) => { res.render('admin/auth/login.ejs') });
routes.push({path:'/login',name:'login-get'})

router.post('/login', (req, res) => { authenticationService.login(req, res) });
routes.push({path:'/login',name:'login-post'})

router.use('/logout', authmiddle.setSessionResponse);
router.use('/logout', authmiddle.sessionChecker);
router.get('/logout', (req, res) => {
    res.clearCookie('user_sid');
    req.session.destroy();
    res.redirect('/login');
});
routes.push({path:'/logout',name:'logout'})

router.use('/home', authmiddle.setSessionResponse);
router.use('/home', authmiddle.sessionChecker);
router.get('/home', (req, res) => { res.render('admin/home/home.ejs') });
routes.push({path:'/home',name:'home'})

module.exports.router = router
module.exports.routes = routes
