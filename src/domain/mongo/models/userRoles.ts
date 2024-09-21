import mongoose, { Schema, Document } from 'mongoose';
import { IUserRoles } from '../../../presentation/interfaces/Mongo_Schemas_Interfaces/Role';

// Define the Mongoose schema
const UserRolesSchema: Schema = new Schema<IUserRoles>(
  {
    userId: {
      type: Number,  // Sequelize's INTEGER equivalent
      required: false,  // allowNull equivalent
    },
    roleId: {
      type: Number,  // Sequelize's INTEGER equivalent
      required: false,  // allowNull equivalent
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const UserRoles = mongoose.model<IUserRoles>('UserRoles', UserRolesSchema);

export default UserRoles;
