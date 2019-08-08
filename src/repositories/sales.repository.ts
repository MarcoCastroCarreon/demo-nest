import { EntityRepository, Repository } from 'typeorm';
import { Sale } from 'src/entities/sale.entity';

@EntityRepository()
export class SaleRepository extends Repository<Sale> {
    
}