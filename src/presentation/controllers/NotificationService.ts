import { createNotification } from "../../application/services/NotificationService";
import { catchResponseHelper } from "../../helpers/response"

export const create = async (req:any,res:any) => {
    try {
        res.json(createNotification(req));
    } catch (error) {
        res.josn(catchResponseHelper(error));
    }
}