import nodemailer from "nodemailer";
import { emailConfigurations, emailTemplateTypesEnum } from "../../utils/constant";
import { get } from "../../data-access/repositories/sql/emailTemplatesRepository";
import logger from "../../presentation/middleware/logger";

export const sendEmail = async (
    email: any,
    type: any = "",
    replacements: any = null
) => {
    try {
        let emailConfiurations = emailConfigurations;
        let message = await tokenReplace(type, replacements);
        if (message) {
            let transporter = nodemailer.createTransport(emailConfigurations.EmailCongigurations);
            let mailOptions = {
                // from: emailConfiurations.configurations?.auth?.user,
                from: `Node Base <${emailConfiurations.EmailCongigurations.auth.user}>`,
                to: email,
                cc: emailConfiurations.CC,
                subject: `${message?.subject || ""}`,
                html: `<span>${message?.content}</span>`
            };
            let info = await transporter.sendMail(mailOptions);
            return true;
        } else return false;
    } catch (error: any) {
        logger.error("Error occurred:", error.message);
        return false; // Failed to send email
    }
};

const tokenReplace = async (name: string, replacements: any) => {
    try {
        // Fetch template type details
        const type = emailTemplateTypesEnum.find(x => x.name == name);

        if (!type) {
            // Handle case where no template type is found
            console.warn(`Template type with name "${name}" not found.`);
            return; // Or throw an error if required by your application logic
        }

        // Fetch template using the retrieved type ID
        const template: any[] = await get({ typeId: type.id });

        if (template && template?.length > 0) {
            if (template[0]?.content) {
                const finalContent = template[0]?.content.replace(
                    /\{([^\}]+)\}/g,
                    (match: any, tokenName: any) => {
                        return replacements[tokenName] !== undefined
                            ? replacements[tokenName]
                            : match;
                    }
                );
                const finalSubject = template[0]?.subject.replace(
                    /\{([^\}]+)\}/g,
                    (match: any, tokenName: any) => {
                        return replacements[tokenName] !== undefined
                            ? replacements[tokenName]
                            : match;
                    }
                );
                return {
                    subject: finalSubject,
                    content: finalContent,
                };
            }
            return {
                subject: "",
                content: "",
            };
        }
        return {
            subject: "",
            content: "",
        };
    } catch (error) {
        logger.error("Error during token replacement:", error);
        return {
            subject: "",
            content: "",
        };
    }
};