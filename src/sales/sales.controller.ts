import { Controller, Post, HttpCode, Body, BadRequestException, Get, Param } from '@nestjs/common';
import { SalesService } from './sales.service';
import CreateSale, { CreateSaleResponse } from './interface/sale.interface';

@Controller('sales')
export class SalesController {

    constructor(private salesService: SalesService) {}

    @Post()
    @HttpCode(201)
    async createSale(@Body() sale: CreateSale): Promise<CreateSaleResponse> {
        if (!sale.workerId || sale.workerId && isNaN(sale.workerId)) throw new BadRequestException(`workerId is required`);
        if (!sale.adminId || sale.adminId && isNaN(sale.adminId)) throw new BadRequestException(`adminId is required`);
        if (sale.workerId === sale.adminId) throw new BadRequestException(`adminId and workerId cant be the same`);
        const created = await this.salesService.createSale(sale);
        return created;
    }

    @Get(':id')
    @HttpCode(200)
    async getSales(@Param('id') adminId: number) {
        if (!adminId) throw new BadRequestException('adminId is required');
        const sales = await this.salesService.getSales(adminId);
        return sales;
    }
}
