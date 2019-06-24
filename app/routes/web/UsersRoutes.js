var express = require('express'), router = express.Router()

var authmiddle = require('../../middlewares/Authentication.js');
var UserService = require('../../services/UserService.js');

var userService = new UserService;
let routes = [];

router.use('/users', authmiddle.sessionChecker);
router.use('/users', authmiddle.setSessionResponse);

router.use('/users', authmiddle.checkPermission('users-index'));
router.get('/users', (req, res) => { userService.getUsers(req, res) });
routes.push({path:'/users',name:'users-index'})

router.use('/users/create', authmiddle.checkPermission('users-create-get'));
router.get('/users/create', (req, res) => { userService.getCreate(req,res) });
routes.push({path:'/users/create',name:'users-create-get'})

router.use('/users/create', authmiddle.checkPermission('users-create-post'));
router.post('/users/create', (req, res) => { userService.createUser(req, res) });
routes.push({path:'/users/create',name:'users-create-post'})

router.use('/users/:iduser/show', authmiddle.checkPermission('users-item-get'));
router.get('/users/:iduser/show', (req, res) => { userService.getUser(req.params.iduser, req, res) });
routes.push({path:'/users/:iduser/show',name:'users-item-get'})

router.use('/users/:iduser/delete', authmiddle.checkPermission('users-get-add-role'));
router.get('/users/:iduser/delete', (req, res) => { userService.deleteUser(req, res); });
routes.push({path:'/users/:iduser/delete',name:'users-get-add-role'})

router.use('/users/:iduser/addrole', authmiddle.checkPermission('users-post-add-role'));
router.get('/users/:iduser/addrole', (req, res) => { userService.addRole(req, res) });
routes.push({path:'/users/:iduser/addrole',name:'users-post-add-role'})

module.exports.router = router
module.exports.routes = routes
