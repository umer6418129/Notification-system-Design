import logger from "../presentation/middleware/logger"
import { queueTypesNames } from "../utils/constant"
import { sendEmail } from "./notificationsHelper/mail"

export const processJob = async (job:any) => {
    try {
        if (!job || !job.type)return true

        if (job.type == queueTypesNames.notifyOtpEmail) {
            let sendMailForOtp = await sendEmail(
                job.email,
                job.template,
                job.payload
            );
        }
        return true;


    } catch (error : any) {
        logger.error(`error while process job ${error?.message}`)
        return false
    }
}