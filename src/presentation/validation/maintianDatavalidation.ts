import Joi from 'joi';
import { queueTypesNames } from '../../utils/constant';

export const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])')).message('Password must contain at least one lowercase letter')
        .pattern(new RegExp('(?=.*[A-Z])')).message('Password must contain at least one uppercase letter')
        .pattern(new RegExp('(?=.*\\d)')).message('Password must contain at least one number')
        .pattern(new RegExp('(?=.*[!@#$%^&*])')).message('Password must contain at least one special character')
        .required()
});
export const updateUserSchema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
});
export const userisActivationSchema = Joi.object({
    id: Joi.number().required(),
    IsActive: Joi.boolean().required(),
});
export const userVerificationSchema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.number().required(),
});
export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});
export const emailTemplateSchema = Joi.object({
    typeId: Joi.number().required(),
    content: Joi.string().required(),
    subject: Joi.string().required(),
});
export const ItemOneSchema = Joi.object({
    name: Joi.string().required(),
}).unknown(true);
export const RoleSchema = Joi.object({
    name: Joi.string().required(),
}).unknown(true);
export const UpdateRoleSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
}).unknown(true);
export const AssignRoleSchema = Joi.object({
    roleIds: Joi.array().required(),
    userId: Joi.number().required(),
}).unknown(false);
export const AssignRolePermissionSchema = Joi.object({
    roleId: Joi.string().required(),
    claims: Joi.array().required(),
}).unknown(false);
export const EmailConfSystemPrefSchema = Joi.object({
    service: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().required(),
    secure: Joi.string().required(),
    user: Joi.string().required(),
    pass: Joi.string().required(),
}).unknown(false);
export const NotificationPrefSchema = Joi.object({
    Email: Joi.boolean().required(),
}).unknown(false);

export const NotificationSchema = Joi.object({
    notificationType: Joi.string().valid(
        queueTypesNames.confirmationEmail,
        queueTypesNames.informationEmail,
        queueTypesNames.sensitiveEmail
    ).required(),
    message: Joi.string().min(1).required(),
    subject: Joi.string().when('notificationType', {
        is: Joi.valid(
            queueTypesNames.confirmationEmail,
            queueTypesNames.informationEmail,
            queueTypesNames.sensitiveEmail
        ),
        then: Joi.string().min(1).required(),
        otherwise: Joi.string().optional().allow('')
    }),
    whereToSend: Joi.string().required(),
}).unknown(false);  // Disallow unknown fields
