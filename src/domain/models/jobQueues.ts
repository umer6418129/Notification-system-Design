import mongoose, { Schema, Document } from 'mongoose';
import { IJobQueue } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/JobQueue';

const ItemOneSchema: Schema = new Schema<IJobQueue>(
  {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: Number,
      required: false,
    },
    payload: {
      type: Object,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
    GUID: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const ItemOne = mongoose.model<IJobQueue>('ItemOne', ItemOneSchema);

export default ItemOne;
