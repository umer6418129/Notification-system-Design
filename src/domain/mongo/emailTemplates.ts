import mongoose, { Schema, Document } from 'mongoose';
import { IEmailTemplate } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/EmailTemplates';


// Define the Mongoose schema
const EmailTemplateSchema: Schema = new Schema<IEmailTemplate>(
  {
    typeId: {
      type: Number, // Corresponds to Sequelize's INTEGER
      required: false, // allowNull equivalent
    },
    content: {
      type: String, // Corresponds to Sequelize's TEXT
      required: false, // allowNull equivalent
    },
    subject: {
      type: String, // Corresponds to Sequelize's STRING
      required: false, // allowNull equivalent
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const EmailTemplate = mongoose.model<IEmailTemplate>('EmailTemplate', EmailTemplateSchema);

export default EmailTemplate;
