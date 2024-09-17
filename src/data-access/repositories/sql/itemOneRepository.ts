import ItemOne from '../../../domain/sql/models/itemOne';
import { catchResponseHelper } from '../../../helpers/response';
import { ItemOneRequest } from '../../../presentation/interfaces/request/ItemOne';

export const create = async (tempData: ItemOneRequest) => {
    try {
        const item = await ItemOne.create(tempData);
        return item;
    } catch (error: any) {
        throw error
    }
};
export const get = async (params: any): Promise<any[]> => {
    try {
        const items = await ItemOne.findAll({
            where: params,
            attributes: ["id", "name"],
            order: [["id", "DESC"]]
        });
        return items || []
    } catch (error: any) {
        catchResponseHelper(error);
        return [];
    }
};
export const getById = async (id: number) => {
    try {
        const item = await ItemOne.findByPk(id, {
            attributes: ["id", "name"]
        });
        return item;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};
export const update = async (param: any, data: ItemOneRequest) => {
    try {
        const item = await ItemOne.update(data, {
            where: param
        });
        return item;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};
export const deleteItems = async (param: any,) => {
    try {
        const item = await ItemOne.destroy({
            where: param
        });
        return item;
    } catch (error: any) {
        throw error
    }
};