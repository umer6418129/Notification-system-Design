import { JobQueueRequest } from "../presentation/interfaces/request/JobQueueRequest"
import logger from "../presentation/middleware/logger"
import { addJobs } from "../presentation/queue/queue"
import { queueTypes, queueTypesNames, userPrefrencesTypes } from "../utils/constant"
import { _sendEmail, sendEmail } from "./notificationsHelper/mail"
import { getOnce as getUserPref } from "../data-access/repositories/systemPrederencesRepository";

export const processEmailJobs = async (job: JobQueueRequest) => {
    try {
        if (!job || !job.type) return true

        if (job.type == queueTypes.find(x => x.name == queueTypesNames.notifyOtpEmail)?.id) {
            let sendMailForOtp = await _sendEmail(
                job.payload.email,
                job.payload.template,
                job.payload.payload
            );
            if (!sendMailForOtp) return false
        } else if (
            job.type == queueTypes.find(x => x.name == queueTypesNames.sensitiveNotification)?.id ||
            job.type == queueTypes.find(x => x.name == queueTypesNames.confirmationNotification)?.id ||
            job.type == queueTypes.find(x => x.name == queueTypesNames.informationNotification)?.id
        ) {
            let getNotificationCOnfigurations = await getUserPref({ userId: job.userId, type: userPrefrencesTypes.emailSmtp });
            let smtp = getNotificationCOnfigurations.value;
            let sendEmailToRecp = await sendEmail({ email: job.payload.recipients.email, emailConfigurations: smtp, message: job.payload.message, subject: job.payload.subject })
            if (sendEmailToRecp)
                return true
            else
                return false

        }
        return true
        // let pushToQueue = await addJobs(job);
        // if (pushToQueue) return true;
        // else return false
    } catch (error: any) {
        logger.error(`error while process job ${error?.message}`)
        return false
    }
}