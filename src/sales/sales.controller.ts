import { Controller, Post, HttpCode, Body, BadRequestException, Get, Param, Put } from '@nestjs/common';
import { SalesService } from './sales.service';
import CreateSale, { CreateSaleResponse, GetSalesResponse, CandyModel } from './interface/sale.interface';

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
    async getSales(@Param('id') adminId: number): Promise<GetSalesResponse[]> {
        if (!adminId) throw new BadRequestException('adminId is required');
        const sales = await this.salesService.getSales(adminId);
        return sales;
    }

    @Put(':id')
    @HttpCode(204)
    async updateSale(@Param('id') saleId: number, @Body() candys?: CandyModel[], finished?: boolean) {
        if (!saleId) throw new BadRequestException(`saleId in pathParams ir required`);
        if (!candys && !finished)
            throw new BadRequestException(`Candys of finished need to be true`);
        await this.salesService.addCandysAndFinishedSale(saleId, candys, finished);
    }
}
