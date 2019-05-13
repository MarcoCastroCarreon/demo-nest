import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Task extends BaseEntity{
    @Column({
        name: 'ID',
        primary: true,
        nullable: false,
        type: 'int',
    })
    id: number;

    @Column({
        name: 'TITLE',
        type: 'varchar'
    })
    title: string;

    @Column({
        name: 'DESCRIPTION',
        type: 'varchar',
    })
    description: string;

    @Column({
        name: 'STATUS',
        type: 'boolean',
    })
    status: boolean;
}