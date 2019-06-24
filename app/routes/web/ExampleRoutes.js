var express = require('express'), router = express.Router()

var authmiddle = require('../../middlewares/Authentication.js');
var ExampleService = require('../../services/ExampleService.js');

var exampleService = new ExampleService;
let routes = [];

router.use('/mail', authmiddle.sessionChecker);
router.use('/upload', authmiddle.sessionChecker);
router.use('/mail', authmiddle.setSessionResponse);
router.use('/upload', authmiddle.setSessionResponse);

router.use('/mail', authmiddle.checkPermission('send-mail'));
router.get('/mail', (req, res) => { exampleService.sendMail(req, res) });
routes.push({path:'/mail',name:'send-mail'})


router.use('/upload', authmiddle.checkPermission('upload-private-file-get'));
router.get('/upload', (req, res) => { res.render('admin/example/uploadfile.ejs') });
routes.push({path:'/upload',name:'upload-private-file-get'})


router.use('/upload', authmiddle.checkPermission('upload-private-file-post'));
router.post('/upload', (req, res) => { exampleService.uploadFile(req, res) });
routes.push({path:'/upload',name:'upload-private-file-post'})

module.exports.router = router
module.exports.routes = routes