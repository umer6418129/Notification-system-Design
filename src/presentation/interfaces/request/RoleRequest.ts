export interface RoleRequest {
    id?: number;
    name: string;
}
export interface AssignRoleRequest {
    roleIds: number[];
    userId: number;
}
export interface AssignRolePermissionsRequest {
    roleId: number;
    claims: string[];
}