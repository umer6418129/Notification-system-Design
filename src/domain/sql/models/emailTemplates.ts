// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index'; // Adjust the import based on your project structure
import { emailTemplateAttributes, emailTemplatereationAttributes } from '../../../presentation/interfaces/pg_model_interfaces/EmailTemplatesInterface';

class EmailTemplates extends Model<emailTemplateAttributes, emailTemplatereationAttributes> implements emailTemplateAttributes {
    public id!: number;
    public typeId!: number;
    public content!: string;
    public subject!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EmailTemplates.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'EmailTemplates',
    }
);

export default EmailTemplates;
