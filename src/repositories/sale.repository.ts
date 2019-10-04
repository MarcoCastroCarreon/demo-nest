import { EntityRepository, Repository } from 'typeorm';
import { Sale } from 'src/entities/sale.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Sale)
export class SaleRepository extends Repository<Sale> {
    async saveSale(sale: Sale): Promise<void> {
        Logger.log('Start Repository - SALE');
        Logger.log('End Repository - SALE');
        await Sale.save(sale);
    }
    async deleteSale(sale: Sale): Promise<void> {
        await Sale.remove(sale);
    }

    async getSalesByAdminId(adminId: number): Promise<Sale[]> {
        Logger.log('Start Repository - SALE');
        const sales = await Sale.getSalesByAdminId(adminId);
        Logger.log('End Repository - SALE');
        return sales;
    }
}
