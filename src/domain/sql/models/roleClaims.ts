// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import { RoleAttributes, RoleCreationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/RoleInterFace';
import { RoleClaimsAttributes, RoleClaimsCreationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/RoleClaimsInterface';

class RoleClaims extends Model<RoleClaimsAttributes, RoleClaimsCreationAttributes> implements RoleClaimsAttributes {
    public id!: number;
    public roleId!: number;
    public claimValue!: any[];

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

RoleClaims.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        claimValue: {
            type: DataTypes.JSONB,
            allowNull: true,
            defaultValue: []
        },
    },
    {
        sequelize,
        tableName: 'RoleClaims',
    }
);

export default RoleClaims;
