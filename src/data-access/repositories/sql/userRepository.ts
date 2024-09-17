import Role from '../../../domain/sql/models/role';
import User from '../../../domain/sql/models/user';
import UserRoles from '../../../domain/sql/models/userRoles';
import { catchResponseHelper } from '../../../helpers/response';
import { UserRequest } from '../../../presentation/interfaces/request/User';
import logger from '../../../presentation/middleware/logger';

export const create = async (userData: UserRequest) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error: any) {
        throw error;
    }
};

export const getOnce = async (params: any): Promise<any> => {
    try {
        let getUser = await User.findOne({
            where: params
        })
        return getUser;
    } catch (error) {
        throw error;
    }
}
export const get = async (params: any, attributes: string[] = []): Promise<any[]> => {
    try {
        let getUsers = await User.findAll({
            where: params,
            attributes: attributes,
            include: [
                {
                    model: UserRoles,
                    attributes : ["id"],
                    include: [
                        {
                            model: Role,
                            attributes : ["name"],
                        }
                    ]
                }
            ]
        })
        return getUsers;
    } catch (error) {
        throw error;
    }
}
export const update = async (param: any, data: any): Promise<any> => {
    try {
        const [affectedRows] = await User.update(data, {
            where: param
        });
        return affectedRows;
    } catch (error) {
        throw error;
    }
};
