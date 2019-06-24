import User from './User';
import Role from './Role';
import Permissions from './Permission';

//User has Roles
User.belongsToMany(Role, { as: 'roles', through: 'UsersHasRoles', foreignKey: 'iduser' })

//Rol has Users
Role.belongsToMany(User, { as: 'users', through: 'UsersHasRoles', foreignKey: 'idrol' })

//Rol has permissions
Role.belongsToMany(Permissions, { as: 'permissions', through: 'RolesHasPermissions', foreignKey: 'idrol' })

//Permission has roles
Permissions.belongsToMany(Role, { as: 'roles', through: 'RolesHasPermissions', foreignKey: 'idpermission' })
