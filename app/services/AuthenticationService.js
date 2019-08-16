import flashMessages from '../imports/FlashMessages.js';
import UsersHasRoles from '../models/UsersHasRoles.js';
import RolesHasPermissions from '../models/RolesHasPermissions.js';
import UserController from '../controllers/UserController';
import RolesController from '../controllers/RolesController';
import AuthenticationController from '../controllers/AuthenticationController';
import PermissionsController from '../controllers/PermissionsController';

/**
 * Services for app web
 */

class AuthenticationService{

    constructor(){
        this.userController = new UserController;
        this.rolesController = new RolesController;
        this.permissionsController = new PermissionsController;
        this.authenticationController = new AuthenticationController;
    }

    /**
     * This function validate the login user and start session - only web
     * Add permissions to session cookie
     */
    async login(req, res){
        try{
            let checkEmailPassword = await this.authenticationController.checkEmailAndPassword(req.body.email, req.body.password);
            if(checkEmailPassword){
                let user = await this.userController.getUserByEmail(req.body.email );
                let rolesUser = await UsersHasRoles.findAll({where:{iduser:user.get('iduser')}});
                let rolesAll = [];
                let permissionsAll = [];
                //Get all permissions for user, a user can have several roles and roles have several permissions
                for(let roleUser of rolesUser){
                    let role = await this.rolesController.getRol(roleUser.idrol);
                    let permissionsRole = await RolesHasPermissions.findAll({where:{idrol: roleUser.idrol}});
                    for(let permissionRole of permissionsRole){
                        let permission = await this.permissionsController.getPermission(permissionRole.idpermission);
                        permissionsAll.push(permission.get('name'));
                    }
                    rolesAll.push(role);
                }
                req.session.user = user.iduser;
                req.session.roles = rolesAll;
                req.session.permissions = permissionsAll;
                //Wait session save on db and after redirect to home
                req.session.save(()=>{ res.redirect('/home'); } );
            }
            else{
                res.render('backend/auth/login.ejs',{ error: 'Usuario o contraseña invalida'});
            }
        }
        catch(err){
            console.log(err);
            flashMessages.showErrorMessage(req, "Error!", "Error al iniciar sesión, por favor consulte al administrador!");
            req.session.save(()=>{ res.redirect('/admin/login') });
        }
    }

    /**
     * This method start session after the login
     */
    async startSession(req, res){
        res.render('backend/home/home.ejs',{rol:req.session.rol, user:req.session.user});
    }

    /**
     * Render the login view for backend
     */
    async renderLoginView(req, res){
        res.render('backend/auth/login.ejs');
    }

}

module.exports = AuthenticationService;
