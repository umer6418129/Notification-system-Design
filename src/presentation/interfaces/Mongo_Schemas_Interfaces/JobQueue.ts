export interface IJobQueue extends Document {
    type: number;
    name: string;
    payload: object;
    status: string;
    GUID: string;
    createdAt?: Date;
    updatedAt?: Date;
  }