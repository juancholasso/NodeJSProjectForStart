import index from '../../index';

var express = index.express;
var app = index.app;
var router = express.Router();

//Array of routes for permissions
let routes = [];


//Routes for BackendWEB
app.use('/', require('./web/LoginRoutes').router )
app.use('/', require('./web/UsersRoutes').router )
app.use('/', require('./web/RolesRoutes').router )
app.use('/', require('./web/PermissionsRoutes').router )
app.use('/', require('./web/ExampleRoutes').router )

//Merge routes array BackendWEB
routes = routes.concat(require('./web/LoginRoutes').routes)
routes = routes.concat(require('./web/UsersRoutes').routes)
routes = routes.concat(require('./web/RolesRoutes').routes)
routes = routes.concat(require('./web/PermissionsRoutes').routes)
routes = routes.concat(require('./web/ExampleRoutes').routes)

//Routes for ApiRest
app.use('/api/', require('./api/LoginRoutes') )
app.use('/api/', require('./api/UsersRoutes') )

//Route for health-check
router.get('/health-check', (req, res) => { res.status(200).json({ok:"Service ok"})} );

//Routes for errors
router.get('/api/*', (req, res) => { res.status(404).json({"error":"Service not found"}) });
router.post('/api/*', (req, res) => { res.status(404).json({"error":"Service not found"}) });

router.get('/*', (req, res) => { res.status(404).send("Page not found") });
router.post('/*', (req, res) => { res.status(404).send("Page not found") });

module.exports.router = router;
module.exports.routes = routes;