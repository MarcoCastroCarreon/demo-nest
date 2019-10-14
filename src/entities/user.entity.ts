import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { UserStatus } from 'src/common/enums/user-status.enum';
import { UserTypeEnum } from 'src/common/enums/user-role.enum';
import { Sale } from './sale.entity';
import { Logger } from '@nestjs/common';

@Entity({ name: 'USER' })
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

    @Column({ name: 'CREATION_DATE' })
    creationDate: Date;

    @OneToMany(type => Sale, sale => sale.worker)
    sales: Sale[];

    static findOneById(id: number): Promise<User> {
        Logger.log('Returning Query - User');
        return this.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.status = :status', { status: UserStatus.ENABLED })
            .getOne();
    }

    static findOneByToken(token: string): Promise<User> {
        Logger.log('Returning Query - User');
        return this.createQueryBuilder('user')
            .where('user.token = :token', { token })
            .andWhere('user.status NOT IN (:status)', { status: [UserStatus.DISABLED, UserStatus.ENABLED] })
            .getOne();
    }

    static findAll(): Promise<User[]> {
        Logger.log('Returning Query - User');
        return this.createQueryBuilder('user')
            .getMany();
    }

    static getByEmail(email: string): Promise<User> {
        Logger.log('Returning Query - User');
        return this.createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    static findAdminById(id: number): Promise<User> {
        Logger.log('Returning Query - User');
        return this.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.userType = :userType', { userType: UserTypeEnum.ADMIN })
            .andWhere('user.status = :status', { status: UserStatus.ENABLED })
            .getOne();
    }

    static findByIdAndType(id: number, userType: UserTypeEnum): Promise<User> {
        Logger.log('Returning Query - User - findByIdAndType');
        return this.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .andWhere('user.userType = :userType', { userType })
            .getOne();
    }
    static findAdminByEmail(email: string): Promise<User> {
        Logger.log('Returning Query - User - findAdminByEmail');
        return this.createQueryBuilder('user')
            .where('user.email = :email', {email})
            .andWhere('user.userType = :userType', { userType: UserTypeEnum.ADMIN })
            .getOne();
    }
}
