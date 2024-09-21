import { create, getOnce } from "../../data-access/repositories/mongo/userRepository"
import { catchResponseHelper, responseHelper } from "../../helpers/response"
import { emailTemplateTypes, general, responseMessages } from "../../utils/constant"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { decrypt, encrypt } from "../../presentation/middleware/security";
import { UserRequest } from "../../presentation/interfaces/request/User";
import { sendEmail } from "../../helpers/notificationsHelper/mail";
import { getUserRoles } from "../../data-access/repositories/mongo/rolesRepository";
dotenv.config();

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
        let creation = await create(body);
        if (creation) {
            let sendMailForOtp = await sendEmail(
                req.body.email,
                emailTemplateTypes.sendOtp,
                {
                    Username: creation?.username,
                    Otp: creation?.otp
                }
            )
            response = responseHelper(1, { message: responseMessages.userCreated });
        }
        else
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "Registeration") });
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