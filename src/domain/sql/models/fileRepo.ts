// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index'; // Adjust the import based on your project structure
import { fileRepoAttributes, fileRepoCreationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/FileRepoInterFace';

class FileRepo extends Model<fileRepoAttributes, fileRepoCreationAttributes> implements fileRepoAttributes {
    public id!: number;
    public refId!: number;
    public refTableName!: string;
    public path!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FileRepo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        refId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        refTableName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'FileRepo',
    }
);

export default FileRepo;
