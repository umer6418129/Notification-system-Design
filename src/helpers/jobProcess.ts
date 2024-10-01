import { JobQueueRequest } from "../presentation/interfaces/request/JobQueueRequest"
import logger from "../presentation/middleware/logger"
import { addJobs } from "../presentation/queue/queue"
import { queueTypes, queueTypesNames } from "../utils/constant"
import { sendEmail } from "./notificationsHelper/mail"

export const processJob = async (job: JobQueueRequest) => {
    try {
        if (!job || !job.type) return true

        if (job.type == queueTypes.find(x => x.name == queueTypesNames.notifyOtpEmail)?.id) {
            let sendMailForOtp = await sendEmail(
                job.payload.email,
                job.payload.template,
                job.payload.payload
            );
            if (!sendMailForOtp) return false
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