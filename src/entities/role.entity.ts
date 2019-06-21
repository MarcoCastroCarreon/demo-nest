import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { UserRoleEnum } from 'src/common/enums/user-role.enum';
import { UserRole } from './user-role.entity';

@Entity({ name: 'ROLE' })
export class Role extends BaseEntity {    
    @PrimaryColumn({
        name: 'NAME',
        type: 'enum',
        enum: UserRoleEnum
    })
    name: UserRoleEnum;

    @Column({name: 'DESCRIPTION'})
    description: String;

    @OneToMany(type => UserRole, userRole => userRole.role)
    userRoles: UserRole[];
}