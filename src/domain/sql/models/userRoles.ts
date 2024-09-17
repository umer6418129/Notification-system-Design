// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import { UserRolesAttributes, UserRolesCreationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/UserRoles';

class UserRoles extends Model<UserRolesAttributes, UserRolesCreationAttributes> implements UserRolesAttributes {
    public id!: number;
    public userId!: number;
    public roleId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserRoles.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'UserRoles',
    }
);

export default UserRoles;
