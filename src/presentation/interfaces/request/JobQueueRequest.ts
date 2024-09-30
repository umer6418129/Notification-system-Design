export interface JobQueueRequest {
    id?: number;
    name: string;
    type : number;
    payload : object;
    GUID : string
    status? : boolean
}