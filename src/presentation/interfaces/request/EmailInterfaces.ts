export interface EmailTemplateRequest {
    typeId?: number;
    content: string;
    subject: string;
}
export interface EmailWithTemplateRequest {
    email: string;
    template: string;
    payload: object;
}