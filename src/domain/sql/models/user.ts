// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index'; // Adjust the import based on your project structure
import { UserAttributes, UserCreationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/UserInterface';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public otp!: number;
    public isVerified!: boolean;
    public IsActive!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otp: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Users',
    }
);

export default User;
