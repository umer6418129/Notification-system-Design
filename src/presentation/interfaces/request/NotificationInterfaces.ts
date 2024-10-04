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

export interface NotificationInterface {
    notificationType: string; // The type of notification (e.g., "email", "inApp", "sms")
    message: string;          // The message body for the notification
    subject?: string;          // The subject of the notification (useful for emails)
    whereToSend: string;      // The recipient or destination (e.g., email address, phone number)
}