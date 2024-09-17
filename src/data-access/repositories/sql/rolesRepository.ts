import Role from '../../../domain/sql/models/role';
import RoleClaims from '../../../domain/sql/models/roleClaims';
import UserRoles from '../../../domain/sql/models/userRoles';
import { AssignRolePermissionsRequest, AssignRoleRequest, RoleRequest } from '../../../presentation/interfaces/request/RoleRequest';

export const create = async (tempData: RoleRequest) => {
    try {
        const role = await Role.create(tempData);
        return role;
    } catch (error: any) {
        throw error
    }
};
export const get = async (params: any): Promise<any[]> => {
    try {
        const roles = await Role.findAll({
            where: params,
            attributes: ["id", "name"],
            order: [["id", "DESC"]]
        });
        return roles || []
    } catch (error: any) {
        throw error
    }
};
export const getUserRoles = async (params: any = {}): Promise<any[]> => {
    try {
        const roles = await UserRoles.findAll({
            where: params,
            attributes: ["id","roleId"],
            order: [["id", "DESC"]],
            include: [
                {
                    model: Role,
                },
            ]
        });
        return roles || []
    } catch (error: any) {
        throw error
    }
};
export const getRoleClaims = async (params: any = {}): Promise<any[]> => {
    try {
        const roles = await RoleClaims.findAll({
            where: params,
            attributes: ["id"],
            order: [["id", "DESC"]]
        });
        return roles || []
    } catch (error: any) {
        throw error
    }
};
export const deleteRoleClaims = async (params: any = {}): Promise<any> => {
    try {
        const roles = await RoleClaims.destroy({
            where: params,
        });
        return roles;
    } catch (error: any) {
        throw error
    }
};
export const getById = async (id: number) => {
    try {
        const role = await Role.findByPk(id, {
            attributes: ["id", "name"]
        });
        return role;
    } catch (error: any) {
        throw error
    }
};
export const update = async (param: any, data: RoleRequest): Promise<any> => {
    try {
        const [affectedRows] = await Role.update(data, {
            where: param
        });
        return [affectedRows];
    } catch (error: any) {
        throw error
    }
};
export const deleteroles = async (param: any,) => {
    try {
        const role = await Role.destroy({
            where: param
        });
        return role;
    } catch (error: any) {
        throw error
    }
};

export const createUserRole = async (body: AssignRoleRequest) => {
    try {
        const { roleIds, userId } = body;
        await UserRoles.destroy({
            where: { userId: userId },
        });
        await Promise.all(
            roleIds.map(async (roleId: number) => {
                const role = {
                    roleId: roleId,
                    userId: userId
                }
                const createdRole = await UserRoles.create(role);
                return createdRole;
            })
        )
        return true;
    } catch (error) {
        throw error
    }

}

export const maintainRoleClaims = async (body: AssignRolePermissionsRequest) => {
    try {
        const find = await RoleClaims.findOne({ where: { roleId: body.roleId } });
        if (find) {
            let id = find.id;
            const result = await RoleClaims.update(body, {
                where: { id },
            });
            // return result;
        } else {
            const result = await RoleClaims.create(body);
            // return result;
        }
        return true
    } catch (error) {
        throw error;
    }
};

export const roleClaims = async (params: any) => {
    try {
        let claims = await RoleClaims.findAll({
            where: params,
            attributes: ["claimValue"]
        })
        return claims
    } catch (error) {
        throw error
    }
}