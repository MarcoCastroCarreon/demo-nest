import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, JoinColumn, ObjectID } from 'typeorm';
import { User } from './user.entity';
import { SalesStatusEnum } from 'src/common/enums/sale-status.enum';

@Entity({ name: 'SALE' })
export class Sale extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'ID' })
    id: number;

    @ManyToOne(type => User, user => user.sales)
    @JoinColumn({ name: 'WORKER_ID' })
    worker: User;

    @ManyToOne(type => User, user => user.sales)
    @JoinColumn({ name: 'ADMIN_ID' })
    admin: User;

    @Column({ name: 'SALE_MONDO_ID' })
    mongoId: string;

    @Column({ name: 'CREATION_DATE' })
    creationDate: Date;

    @Column({ name: 'LAST_UPDATE_DATE' })
    lastUpdateDate: Date;

    @Column({ name: 'STATUS', type: 'enum', enum: SalesStatusEnum })
    status: SalesStatusEnum;

}
