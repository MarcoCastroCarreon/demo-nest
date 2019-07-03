import { Repository, EntityRepository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { UserRoleEnum } from 'src/common/enums/user-role.enum';


@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    
    saveUserRole(role: Role): Promise<Role> {
        return Role.save(role);
    }

    getRole(roles: UserRoleEnum[]): Promise<Role[]> {
        return Role.getRoles(roles);
    }
 }