var express = require('express'), router = express.Router()

var authmiddle = require('../../middlewares/Authentication.js');
var RolesService = require('../../services/RolesService.js');

var rolesService = new RolesService;
let routes = [];


router.use('/roles', authmiddle.sessionChecker);
router.use('/roles', authmiddle.setSessionResponse);

router.use('/roles', authmiddle.checkPermission('roles-index'));
router.get('/roles', (req, res) => { rolesService.getRoles(req, res) });
routes.push({path:'/roles',name:'roles-index'})

router.use('/roles/create', authmiddle.checkPermission('roles-create-get'));
router.get('/roles/create', (req, res) => { res.render('roles/create.ejs') });
routes.push({path:'/roles/create',name:'roles-create-get'})

router.use('/roles/create', authmiddle.checkPermission('roles-create-post'));
router.post('/roles/create', (req, res) => { rolesService.createRol(req, res) });
routes.push({path:'/roles/create',name:'roles-create-post'})

router.use('/roles/:idrol/show', authmiddle.checkPermission('roles-item-get'));
router.get('/roles/:idrol/show', (req, res) => { rolesService.getRol(req.params.idrol, req, res) });
routes.push({path:'/roles/:idrol/show',name:'roles-item-get'})

router.use('/roles/:idrol/permissions', authmiddle.checkPermission('roles-item-permissions-get'));
router.get('/roles/:idrol/permissions', (req, res) => { rolesService.getPermissions(req, res) });
routes.push({path:'/roles/:idrol/permissions',name:'roles-item-permissions-get'})

router.use('/roles/:idrol/permissions', authmiddle.checkPermission('roles-item-permissions-post'));
router.post('/roles/:idrol/permissions', (req, res) => { rolesService.updatePermissions(req, res) });
routes.push({path:'/roles/:idrol/permissions',name:'roles-item-permissions-post'})

router.use('/roles/:idrol/delete', authmiddle.checkPermission('roles-item-delete'));
router.get('/roles/:idrol/delete', (req, res) => { rolesService.deleteRol(req, res) });
routes.push({path:'/roles/:idrol/delete',name:'roles-item-delete'})


module.exports.router = router
module.exports.routes = routes
