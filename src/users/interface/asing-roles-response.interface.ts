import { UserRole } from "src/entities/user-role.entity";

export interface AsignRolesResponse {
    id: number;
    roles: UserRole[];
}