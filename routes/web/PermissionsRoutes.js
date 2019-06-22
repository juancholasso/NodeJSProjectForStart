var express = require('express'), router = express.Router()

var authmiddle = require('../../middlewares/Authentication.js');
var PermissionsService = require('../../services/PermissionsService.js');
var permissionsService = new PermissionsService;
let routes = [];

router.use('/permissions', authmiddle.sessionChecker);
router.use('/permissions', authmiddle.setSessionResponse);

router.use('/permissions/update', authmiddle.checkPermission('permissions-update'));
router.get('/permissions/update', (req, res) => { permissionsService.updatePermissions(req, res) });
routes.push({path:'/permissions/update',name:'permissions-update'})

router.use('/permissions', authmiddle.checkPermission('permissions-index'));
router.get('/permissions', (req, res) => { permissionsService.getPermissions(req, res) });
routes.push({path:'/permissions',name:'permissions-index'})


router.use('/permissions/:idpermission/delete', authmiddle.checkPermission('permissions-delete'));
router.get('/permissions/:idpermission/delete', (req, res) => { permissionsService.deletePermission(req, res) });
routes.push({path:'/permissions/:idpermission/delete',name:'permissions-delete'})


module.exports.router = router
module.exports.routes = routes
