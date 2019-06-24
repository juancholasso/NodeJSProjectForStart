var flashMessages = require('../imports/FlashMessages.js');
import PermissionsController from '../controllers/PermissionsController.js';

class PermissionsService{

  constructor(){
    this.permissionsController = new PermissionsController;
  }

  async updatePermissions(req, res){
    try{
        var routes = require('../routes/routes.js').routes;
        for(var route of routes){
          try{
            await this.permissionsController.createPermission(route.name, route.path);
          }
          catch(err){
            console.log(`The route ${route.name} already has been created!`)
          }
        }
        flashMessages.showSuccessMessage(req, "Exito!", "Permisos Actualizados!");
        req.session.save(()=>{ res.redirect('/permissions') });
    }
    catch(err){
        console.log(err);
        flashMessages.showErrorMessage(req, "Error!", "No se han podido actualizar los permisos!");
        req.session.save(()=>{ res.redirect('/permissions') });
    }
  }

  async getPermissions(req, res){
    try{
      var permissions = await this.permissionsController.getPermissions();
      res.render('admin/permissions/index.ejs',{ permissions:permissions });
    }
    catch(err){
      flashMessages.showErrorMessage(req, "Error!", "No se han podido consultar los permisos!");
      req.session.save(()=>{ res.redirect('/home') });
    }
  }

  async deletePermission(req, res){
    try{
      this.permissionsController.delelePermission(req.params.idpermission);
      flashMessages.showSuccessMessage(req, "Exito!", "Permiso eliminado con éxito!");
      req.session.save(()=>{ res.redirect('/permissions') });
    }
    catch(err){
      flashMessages.showErrorMessage(req, "Error!", "No se han podido eliminar el permiso!");
      req.session.save(()=>{ res.redirect('/permissions') });
    }
  }

}


module.exports = PermissionsService;
