import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, ManyToOne, JoinColumn, ObjectID, ObjectIdColumn } from 'typeorm';
import { User } from './user.entity';
import { SalesStatusEnum } from 'src/common/enums/sale-status.enum';
import { Logger } from '@nestjs/common';

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

    @Column({ name: 'SALE_MONGO_ID'})
    mongoId: string;

    @Column({ name: 'CREATION_DATE' })
    creationDate: Date;

    @Column({ name: 'LAST_UPDATE_DATE' })
    lastUpdateDate: Date;

    @Column({ name: 'STATUS', type: 'enum', enum: SalesStatusEnum })
    status: SalesStatusEnum;

    @Column({ name: 'SALES_PROFIT', type: 'float' })
    salesProfit: number;

    @Column({ name: 'PRODUCT_EQUIVALENCE', type: 'float' })
    productEquivalence: number;

    @Column({ name: 'FINISHED_DATE' })
    finishedDate: Date;
    
    static getSalesByAdminId(adminId: number) {
        Logger.log('Returning Query - SALE');
        return this.createQueryBuilder('sale')
            .leftJoinAndSelect('sale.admin', 'admin')
            .leftJoinAndSelect('sale.worker', 'worker')
            .where('admin.id = :adminId', {adminId})
            .getMany();
            
    }

}
