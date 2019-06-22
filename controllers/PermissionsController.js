var Permission = require('../models/Permission.js');

/**
 * PermissionController
 */
class PermissionsController{

  async getPermission(pidpermission){
    let permission = await Permission.findByPk(pidpermission);
    return permission; 
  }

  async createPermission(pname, ppath){
    try{
      await Permission.create({
          name:pname,
          path:ppath
      })
    }
    catch(err){
       throw err;
    }
  }

  async getPermissions(){
    try{
      let permissions = await Permission.findAll();
      return permissions;
    }
    catch(err){
       throw err;
    }
  }

}

//Exports-------------------------------------
module.exports = PermissionsController;
