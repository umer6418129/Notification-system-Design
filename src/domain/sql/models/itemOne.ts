// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index'; // Adjust the import based on your project structure
import { itemOneRepoAttributes, itemOneRepoCreationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/Item1InterFace';

class ItemOne extends Model<itemOneRepoAttributes, itemOneRepoCreationAttributes> implements itemOneRepoAttributes {
    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ItemOne.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'ItemOne',
    }
);

export default ItemOne;
