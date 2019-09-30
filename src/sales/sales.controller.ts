import { Controller, Post, HttpCode, Body, BadRequestException } from '@nestjs/common';
import { SalesService } from './sales.service';
import CreateSale from './interface/sale.interface';

@Controller('sales')
export class SalesController {

    constructor(private salesService: SalesService) {}

    @Post()
    @HttpCode(201)
    async createSale(@Body() sale: CreateSale) {
        if (!sale.workerId || sale.workerId && isNaN(sale.workerId)) throw new BadRequestException(`workerId is required`);
        await this.salesService.createSale(sale);
    }

}
