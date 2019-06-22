import User from '../models/User.js';
import Role from '../models/Role.js';
import UserController from '../controllers/UserController';
import RolesController from '../controllers/RolesController';
import bcrypt from 'bcrypt';
import flashMessages from '../imports/FlashMessages.js';

/**
 * Services for app web
 */

class UserService{

    constructor(){
        this.userController = new UserController;
        this.rolesController = new RolesController
    }

    async getUsers(req, res){
        try{
            let users = await this.userController.getUsers();
            res.render('users/index.ejs',
                {  
                    rol:req.session.rol, 
                    user:req.session.user, 
                    users:users
                }
            );   
        }
        catch(err){
            flashMessages.showErrorMessage(req, "Error!", "No se han podido consultar los usuarios!");
            req.session.save(()=>{ res.redirect('/home') });
        }
    }

    async createUser(req, res){
        try{
            await this.userController.createUser
            (
                req.body.name, 
                req.body.lastname,
                req.body.password,
                req.body.iddocument,
                req.body.email,
                req.body.telephone,
                req.body.idrol
            )            
            flashMessages.showSuccessMessage(req, "Exito!", "El usuario se ha creado existosamente!");
            req.session.save(()=>{ res.redirect('/users') });
        }
        catch(err){
            console.log(err)
            flashMessages.showErrorMessage(req, "Error!", "El usuario no se ha podido crear!");
            req.session.save(()=>{ res.redirect('/users') });
        }
    }

    async getCreate(req, res){
        try{
            let roles = await Role.findAll()
            res.render('users/create.ejs',
                {  
                    rol:req.session.rol, 
                    user:req.session.user, 
                    roles:roles, 
                }
            );        
        }
        catch(err){
            flashMessages.showErrorMessage(req, "Error!", "No se ha podido cargar el modulo para la creación de usuarios!");
            req.session.save(()=>{ res.redirect('/users') });
        }
        
    }

    async deleteUser(req, res){
        if(req.params.iduser == req.session.user){
            flashMessages.showErrorMessage(req, "Error!", "No puede eliminar el usuario con el que está logueado!");
            req.session.save(()=>{ res.redirect('/users') });
        }
        else{
            try{
                await this.userController.deleteUser(req.params.iduser);
                flashMessages.showSuccessMessage(req, "Exito!", "El usuario se ha eliminado exitosamente!");
                req.session.save(()=>{ res.redirect('/users') });
            }
            catch(err){
                console.log(err);
                flashMessages.showErrorMessage(req, "Error!", "El usuario no se ha podido eliminar!");
                req.session.save(()=>{ res.redirect('/users') });
            }
        }
    }

    async getUser(iduser, req, res){
        try{
            let userRes = await this.userController.getUser(iduser);
            res.render('users/show.ejs',{rol:req.session.rol, user:req.session.user, user_res:userRes });
        }
        catch(err){
            console.log(err);
            flashMessages.showErrorMessage(req, "Error!", "Error al encontrar el usuario!");
            req.session.save(()=>{ res.redirect('/users') });
        }
    }

}

module.exports = UserService;