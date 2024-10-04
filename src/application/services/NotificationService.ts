import { getOnce as getUserPref } from "../../data-access/repositories/systemPrederencesRepository";
import { getOnce as getUser } from "../../data-access/repositories/userRepository";
import { sendEmail } from "../../helpers/notificationsHelper/mail";
import { catchResponseHelper, responseHelper } from "../../helpers/response"
import { NotificationInterface } from "../../presentation/interfaces/request/NotificationInterfaces";
import { initProducer } from "../../presentation/kafka/producer"
import { kafkaMaintopicsNames, queueTypes, queueTypesNames, responseMessages, userPrefrencesTypes } from "../../utils/constant"

export const createNotification = async (req: any) => {
    try {
        let data: NotificationInterface = req.body;
        let currentUserId = req.session.user.userId;
        if (
            data.notificationType == queueTypesNames.confirmationEmail ||
            data.notificationType == queueTypesNames.informationEmail ||
            data.notificationType == queueTypesNames.sensitiveEmail || data.notificationType == "email") {
            if (!data.subject) return responseHelper(0, { message: responseMessages.isReuired.replace("{replace}", "Subject") });
            const user = await getUser({ _id: currentUserId });
            if (!user) return responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "User") });
            let getNotificationCOnfigurations = await getUserPref({ type: userPrefrencesTypes.emailSmtp, userId: currentUserId });
            if (!getNotificationCOnfigurations) return responseHelper(0, { message: "Email Configurations not Updated" });
            let sendMail = await sendEmail({ email: data.whereToSend, message: data.message, subject: data.subject, emailConfigurations: getNotificationCOnfigurations.value })
            if (sendMail) return responseHelper(1, { message: responseMessages.success.replace("{replace}", "Email") });
            else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "send email") });

        }
        // return responseHelper(1, { message: "JOb Created" });
    } catch (error) {
        return catchResponseHelper(error)
    }
}

export const notificationTypes = async (req: any) => {
    try {
        let types = [
            queueTypesNames.sensitiveEmail,
            queueTypesNames.confirmationEmail,
            queueTypesNames.informationEmail,
        ];
        return responseHelper(1, types);
    } catch (error) {
        return catchResponseHelper(error)
    }
}