import { EntityRepository, Repository } from 'typeorm';
import { Sale } from 'src/entities/sale.entity';

@EntityRepository(Sale)
export class SaleRepository extends Repository<Sale> {
    async saveSale(sale: Sale) {
        await Sale.save(sale);
    }
}
