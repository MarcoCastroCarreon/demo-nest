import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { UserStatus } from 'src/common/enums/user-status.enum';
import { UserTypeEnum } from 'src/common/enums/user-role.enum';

@Entity({name: 'USER'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'ID',
        type: 'int',
    })
    id: number;

    @Column({
        name: 'NAME',
        type: 'varchar',
        nullable: true,
    })
    name: string;

    @Column({
        name: 'EMAIL',
        type: 'varchar',
        nullable: false,
    })
    email: string;

    @Column({
        name: 'PASSWORD',
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        name: 'STATUS',
        type: 'enum',
        enum: UserStatus,
    })
    status: UserStatus;

    @Column({
        name: 'TOKEN',
        type: 'varchar',
        nullable: true,
    })
    token: string;

    @Column({
        name: 'USER_TYPE',
        type: 'enum',
        enum: UserTypeEnum,
    })
    userType: UserTypeEnum;

    static findOneById(id : number): Promise<User> {
        return this.createQueryBuilder('user')
            .where('user.id =: id', {id})
            .getOne();
    }

    static findOneByToken(token: string): Promise<User> {
        return this.createQueryBuilder('user')
            .where('user.token = :token', {token})
            .getOne();
    }

    static findAll(): Promise<User[]> {
        return this.createQueryBuilder('user')
            .getMany();
    }

    static getByEmail(email: string): Promise<User> {
        return this.createQueryBuilder('user')
            .where('user.email = :email', {email})
            .getOne();
    }
}
