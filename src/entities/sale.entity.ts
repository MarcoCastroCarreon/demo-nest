import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SALE')
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'ID' })
    id: number;
}