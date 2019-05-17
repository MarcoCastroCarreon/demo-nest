import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

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
        type: 'boolean',
    })
    enabled: boolean;

}
