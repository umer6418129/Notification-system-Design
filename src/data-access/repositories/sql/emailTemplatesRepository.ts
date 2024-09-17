import EmailTemplates from '../../../domain/sql/models/emailTemplates';
import { catchResponseHelper } from '../../../helpers/response';
import { EmailTemplateRequest } from '../../../presentation/interfaces/request/EmailTemplates';

export const create = async (tempData: EmailTemplateRequest) => {
    try {
        const template = await EmailTemplates.create(tempData);
        return template;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};
export const get = async (params: any): Promise<any[]> => {
    try {
        const templates = await EmailTemplates.findAll({
            where: params
        });
        return templates || []
    } catch (error: any) {
        catchResponseHelper(error);
        return [];
    }
};
export const getById = async (id: number) => {
    try {
        const template = await EmailTemplates.findByPk(id);
        return template;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};