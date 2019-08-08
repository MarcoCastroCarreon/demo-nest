import { Injectable } from '@nestjs/common';
import { SaleRepository } from 'src/repositories/sales.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/entities/sale.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private saleRepository: SaleRepository,
    ) {}

    async createSale() {
        
    }
}
