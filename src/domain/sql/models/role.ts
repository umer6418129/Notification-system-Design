// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import { RoleAttributes, RoleCreationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/RoleInterFace';

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Roles',
    }
);

export default Role;
