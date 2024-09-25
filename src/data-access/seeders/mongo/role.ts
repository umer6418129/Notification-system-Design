import { adminPermissions, permanentRoles } from "../../../utils/constant"
import { create, get, maintainRoleClaims } from "../../repositories/mongo/rolesRepository"

export const roleSeeder = async () => {
    let roles : string[] = [
        permanentRoles.Admin,
        permanentRoles.notificationConsumer
    ]
    for (const role of roles) {
        let ifRoleExist = await get({name : role});
        if (!ifRoleExist || ifRoleExist.length <= 0) {
            let createRole = await create({
                name: role
            })
            if (createRole){
                let claims = createRole?.name ==  permanentRoles.Admin ? adminPermissions : []
                let createRoleClaims = await maintainRoleClaims({
                    roleId : createRole.id,
                    claims : claims
                })
            }
        }
    }
}