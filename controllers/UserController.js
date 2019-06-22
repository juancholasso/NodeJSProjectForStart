import User from '../models/User';
import Role from '../models/Role'
import UsersHasRoles from '../models/UsersHasRoles.js';
import bcrypt from 'bcrypt';
import sequelize from '../config/dbconn';
/**
 * UserController
 */
class UserController{
    
    async getUsers(){
        try{
            let users = await User.findAll({
                include: [{
                    as: "roles",
                    model: Role
                }]
              })
            return users;
        }
        catch(err){
            throw err;
        }
    }
    
    async createUser(pname, plastname, ppassword, piddocument, pemail, ptelephone, pidrol ){
        let transaction;
        try{
            transaction = await sequelize.transaction();

            let newUser = await User.create({
                name:pname,
                lastname:plastname,
                password:bcrypt.hashSync(ppassword,10),
                iddocument:piddocument,
                email:pemail,
                telephone:parseInt(ptelephone),
            }, {transaction: transaction})

            await UsersHasRoles.create({iduser:newUser.iduser, idrol:pidrol}, {transaction: transaction});

            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    async deleteUser(iduser){
        let transaction;
        try{
            transaction = await sequelize.transaction();
            await User.destroy({ where: { iduser: iduser } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    async getUser(iduser){
        try{
            let userRes = await User.findByPk(iduser);
            return userRes;
        }
        catch(err){
            throw err;
        }
    }

    async addRole(iduser, idrol){
        try{
            await UsersHasRoles.create({iduser:iduser, idrol:idrol});
        }
        catch(err){
            throw err;
        }
    }

    async removeRole(iduser, idrol){
        try{
            await UsersHasRoles.destroy({ where:{ iduser:iduser, idrol:idrol }});
        }
        catch(err){
            throw err;
        }
    }

    async getUserByEmail(pEmail){
        try{
            let userRes = await User.findOne({where:{email: pEmail}});
            return userRes;
        }
        catch(err){
            throw err;
        }
    }
}



//Exports-------------------------------------
module.exports = UserController;