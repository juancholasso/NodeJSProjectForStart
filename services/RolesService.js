import flashMessages from '../imports/FlashMessages.js';
import RolesController from '../controllers/RolesController.js';
import PermissionsController from '../controllers/PermissionsController';
/**
 * Services for app web
 */

class RolesService{

    constructor(){
        this.rolesController = new RolesController;
        this.permissionsController = new PermissionsController;
    }

    async getRoles(req, res){
        try{
            let roles = await this.rolesController.getRoles();
            res.render(('roles/index.ejs'),{ roles:roles });
        }
        catch(err){
            console.log(err);
            flashMessages.showErrorMessage(req, "Error!", "No se han podido consultar los roles!");
            req.session.save(()=>{ res.redirect('/home') });
        }
    }
    
    //Function for create Rol on web
    async createRol(req, res){
        try{
            await this.rolesController.createRol(req.body.rol);
            flashMessages.showSuccessMessage(req, "Exito!", "El rol se ha creado existosamente!");
            req.session.save(()=>{ res.redirect('/roles') });
        }
        catch(err){
            console.log(err);
            flashMessages.showErrorMessage(req, "Error!", "El rol no se ha podido crear!");
            req.session.save(()=>{ res.redirect('/roles') });
        }
    }
    
    async getRol(idrol, req, res){
        try{
            let rol = await this.rolesController.getRol(idrol);
            res.render('roles/show.ejs',{rol:req.session.rol, user:req.session.user, rol_res:rol });
        }
        catch(err){
            console.log(err);
            flashMessages.showErrorMessage(req, "Error!", "El rol no ha sido encontrado!");
            req.session.save(()=>{ res.redirect('/roles') });
        }
    }
    
    async deleteRol(req, res){
        try{
            let rol = await this.rolesController.getRol(req.params.idrol);
            if(rol.rol == "admin"){
                flashMessages.showErrorMessage(req, "Error!", "No puede eliminar el Rol admin!");
                req.session.save(()=>{ res.redirect('/roles') });
            }
            else{
                try{
                    await this.rolesController.deleteRol(req.params.idrol);
                    flashMessages.showSuccessMessage(req, "Exito!", "El rol se ha eliminado exitosamente!");
                    req.session.save(()=>{ res.redirect('/roles') });
                }
                catch(err){
                    console.log(err);
                    flashMessages.showErrorMessage(req, "Error!", "El rol se ha podido eliminar!");
                    req.session.save(()=>{ res.redirect('/roles') });
                }
            }
        }
        catch(err){
            console.log(err);
            flashMessages.showErrorMessage(req, "Error!", "El rol se ha podido eliminar!");
            req.session.save(()=>{ res.redirect('/roles') });
        }
    }

    async getPermissions(req, res){
        try{
            let permissions = await this.permissionsController.getPermissions();
            let permissionsAsigned = await this.rolesController.getPermissions(req.params.idrol);
            res.render('roles/addpermissions.ejs',{ permissions:permissions, permissionsAsigned:permissionsAsigned });
        }
        catch(err){
            console.log(err)
            flashMessages.showErrorMessage(req, "Error!", "No se han podido consultar los permisos!");
            req.session.save(()=>{ res.redirect('/roles') });
        }
    }

    async updatePermissions(req, res){
        try{
            await this.rolesController.removeAllPermissions(req.params.idrol);
            await this.rolesController.setListPermissions(req.params.idrol, req.body.permissions);
            flashMessages.showSuccessMessage(req, "Exito!", "Se han actualizado los permisos!");
            req.session.save(()=>{ res.redirect('/roles') });
        }   
        catch(err){
            console.log(err)
            flashMessages.showErrorMessage(req, "Error!", "No se han podido actualizar los permisos!");
            req.session.save(()=>{ res.redirect('/roles') });
        }
    }
    
    /**
     * 
     * Services for app mobile (rest)
     *
     */
    async getRolesApi(req, res){
        try{
            let roles = await rolesController.getRoles();
            res.json(roles);
        }
        catch(err){
            console.log(err);
            res.status(500).json({ error: err });
        }
    }
}


module.exports = RolesService;