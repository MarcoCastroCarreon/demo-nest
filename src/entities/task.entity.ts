import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({name: 'TASK'})
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'ID',
        type: 'int',
    })
    id: number;

    @Column({
        name: 'TITLE',
        type: 'varchar',
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

    static getTasks() {
        return this.createQueryBuilder('task')
            .getMany();
    }

    static getTask(taskId: number) {
        return this.createQueryBuilder('task')
            .where('task.id = :taskId',{taskId})
            .getOne();
    }
}