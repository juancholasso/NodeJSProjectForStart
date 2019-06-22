import Role from '../models/Role.js';
import RolesHasPermissions from '../models/RolesHasPermissions';
import PermissionsController from './PermissionsController';
import sequelize from '../config/dbconn';

/**
 * RolesController
 */

class RolesController{

    constructor(){
        this.permissionsController = new PermissionsController;
    }

    async getRoles(){
        try{
            let roles = await Role.findAll();
            return roles;
        }
        catch(err){
            throw err;
        }
    }
    
    //Create rol
    async createRol(rol){
        try{
            await Role.create({
                  rol:rol,
            })
        }
        catch(err){
            throw err;
        }
    }
    
    //Get object rol by idrol
    async getRol(idrol){
        try{
            let rol = await Role.findByPk(idrol);
            return rol;
        }
        catch(err){
            throw err;
        }
    }
    
    //Delete rol by idrol
    async deleteRol(idrol){
        let transaction;
        try{
            transaction = await sequelize.transaction();
            await Role.destroy({ where: { idrol: idrol } }, {transaction: transaction});
            await RolesHasPermissions.destroy({ where: {idrol: idrol}}, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            transaction.rollback();
            throw err;
        }
    }

    //Add permission for role
    async setPermission(pidrol, pidpermission){
        var permissionRole = await RolesHasPermissions.findOne({idrol:pidrol, idpermission:pidpermission});
        console.log(permissionRole);
    }

    async setListPermissions(pidrol, pidpermissions){
        console.log(pidpermissions)
        let transaction;
        try{
            transaction = await sequelize.transaction();
            for(let idpermission of pidpermissions){
                await RolesHasPermissions.create({idrol:pidrol,idpermission:parseInt(idpermission)}, {transaction: transaction});
            }
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback()
            throw err;
        }
    }

    async removeAllPermissions(pidrol){
        let transaction;
        try{
            transaction = await sequelize.transaction();
            await RolesHasPermissions.destroy({where:{idrol: pidrol}}, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback()
            throw err;
        }
    }

    async getPermissions(pidrol){
        var rolePermission = await RolesHasPermissions.findAll({where:{idrol:pidrol}});
        var permissions = [];
        for(let permission of rolePermission){
            var tempPermission = await this.permissionsController.getPermission(permission.get('idpermission'));
            permissions[permission.get('idpermission')] = tempPermission;
        }
        return permissions;
    }
}
//Get list with all roles

module.exports = RolesController;
