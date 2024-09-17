import Role from "../models/role";
import RoleClaims from "../models/roleClaims";
import User from "../models/user";
import UserRoles from "../models/userRoles";

export const rolesAssociations = () => {
    RoleClaims.belongsTo(Role, { foreignKey: 'roleId' });
    Role.hasOne(RoleClaims, { foreignKey: 'roleId' });

    UserRoles.belongsTo(User, { foreignKey: 'userId' });
    User.hasMany(UserRoles, { foreignKey: 'userId' });

    UserRoles.belongsTo(Role, { foreignKey: 'roleId' });
    Role.hasMany(UserRoles, { foreignKey: 'roleId' });
}