export interface IJobQueue extends Document {
    type: number;
    name: string;
    payload: object;
    status: boolean;
    GUID: string;
    createdAt?: Date;
    updatedAt?: Date;
  }