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
        if (!sale.adminId || sale.adminId && isNaN(sale.adminId)) throw new BadRequestException(`adminId is required`);
        if (sale.workerId === sale.adminId) throw new BadRequestException(`adminId and workerId cant be the same`);
        await this.salesService.createSale(sale);
    }

}
