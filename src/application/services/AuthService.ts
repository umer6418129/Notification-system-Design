import { create, getOnce } from "../../data-access/repositories/userRepository"
import { catchResponseHelper, responseHelper } from "../../helpers/response"
import { emailTemplateTypes, general, kafkaMaintopicsNames, queueTypes, queueTypesNames, responseMessages } from "../../utils/constant"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { decrypt, encrypt } from "../../presentation/middleware/security";
import { UserRequest } from "../../presentation/interfaces/request/User";
import { sendEmail } from "../../helpers/notificationsHelper/mail";
import { getUserRoles } from "../../data-access/repositories/rolesRepository";
import { initProducer } from "../../presentation/kafka/producer";
import { JobQueueRequest } from "../../presentation/interfaces/request/JobQueueRequest";
dotenv.config();
import { Guid } from 'js-guid';
import { EmailWithTemplateRequest } from "../../presentation/interfaces/request/EmailInterfaces";
export const register = async (req: any) => {
    try {
        let response;
        let encryptedPass = await encrypt(req.body.password);
        let otp = Math.floor(100000 + Math.random() * 900000);
        let body: UserRequest = {
            username: req.body.username,
            email: req.body.email,
            password: encryptedPass,
            otp: otp
        };
        let ifUserExist = await getOnce({ email: req.body.email })
        if (!ifUserExist) {
            let creation = await create(body);
            if (creation) {
                const guid = new Guid();
                let type = queueTypes.find(x => x.name == queueTypesNames.confirmationEmail)?.id;
                let _guid = guid.toString()
                let dataObj: JobQueueRequest = {
                    name: queueTypesNames.confirmationEmail + "--" + _guid,
                    payload: {
                        email: req.body.email,
                        template: emailTemplateTypes.sendOtp,
                        payload: {
                            Username: creation?.username,
                            Otp: creation?.otp
                        }
                    },
                    type: type,
                    GUID: _guid
                }
                await initProducer(dataObj, kafkaMaintopicsNames.transaction);
                response = responseHelper(1, { message: responseMessages.userCreated });
            }
            else
                response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "Registeration") });
        } else if (ifUserExist && !ifUserExist?.isVerified) {
            const guid = new Guid();
            let _guid = guid.toString()
            let emailPayload: EmailWithTemplateRequest = {
                email: req.body.email,
                template: emailTemplateTypes.sendOtp,
                payload: {
                    Username: ifUserExist?.username,
                    Otp: ifUserExist?.otp
                }
            }
            let dataObj: JobQueueRequest = {
                name: queueTypesNames.confirmationEmail + "--" + _guid,
                payload: emailPayload,
                type: queueTypes.find(x => x.name == queueTypesNames.notifyOtpEmail)?.id,
                GUID: _guid
            }
            await initProducer(dataObj, kafkaMaintopicsNames.transaction);
            response = responseHelper(1, { message: responseMessages.userCreated });
        } else {
            response = responseHelper(0, { message: responseMessages.alreadyExist.replace("{replace}", "User") });
        }
        return response
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}
export const login = async (req: any) => {
    try {
        let userObject = req.body;
        let makeLoginUser = await makeLogin(userObject)
        return makeLoginUser
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

const makeLogin = async (userObj: any) => {
    try {
        let findUser = await getOnce({ email: userObj?.email })
        if (!findUser)
            return responseHelper(0, { message: responseMessages.incCorrect.replace("{replace}", "Email") });
        if (findUser && !findUser?.isVerified)
            return responseHelper(0, { message: "User is not verified" });
        if (findUser && !findUser?.IsActive)
            return responseHelper(0, { message: "User is not active" });
        let userPassword = await decrypt(findUser.password);
        if (userObj?.password != userPassword)
            return responseHelper(0, { message: responseMessages.incCorrect.replace("{replace}", "Password") });

        let userRoles = await getUserRoles({ userId: findUser.id });

        const token = jwt.sign(
            { userId: findUser.id, roles: userRoles?.map((role) => role.roleId) },
            general.jwtKey,
            { expiresIn: "30d" }
        );
        findUser.token = token;
        return responseHelper(1, { name: findUser?.username, isVerified: findUser?.isVerified, IsActive: findUser?.IsActive, token: token });


    } catch (error) {
        throw error
    }
}