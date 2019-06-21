import { BaseEntity, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: 'USER_ROLE' })
export class UserRole extends BaseEntity {
    @ManyToOne(type => User, user => user.userRoles, { primary:  true })
    @JoinColumn({
        name: 'USER_ID'
    })
    user: User;

    @ManyToOne(type => Role, role => role.userRoles, { primary:  true })
    @JoinColumn({
        name: 'ROLE'
    })
    role: Role;
}