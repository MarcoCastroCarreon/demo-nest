import { Repository, EntityRepository } from 'typeorm';
import { UserRole } from 'src/entities/user-role.entity';


@EntityRepository(UserRole)
export class UserRoleRepository extends Repository<UserRole> {
    
    saveUserRole(userRole: UserRole): Promise<UserRole> {
        return UserRole.save(userRole);
    }
 }
