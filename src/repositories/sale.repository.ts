import { EntityRepository, Repository } from 'typeorm';
import { Sale } from 'src/entities/sale.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Sale)
export class SaleRepository extends Repository<Sale> {

    /**
     * Saves the pass sale in the database
     * @author mcastro
     * @param sale the sale to save
     * @returns {Promise} void
     */
    async saveSale(sale: Sale): Promise<void> {
        Logger.log('Start Repository - SALE');
        Logger.log('End Repository - SALE');
        await Sale.save(sale);
    }

    /**
     * Deletes the pass sale in the database
     * @author mcastro
     * @param sale the sale to remove from database
     * @returns {Promise} void
     */
    async deleteSale(sale: Sale): Promise<void> {
        await Sale.remove(sale);
    }

    /**
     * Get the admin sales with the given id
     * @author mcastro
     * @param adminId the id of the admin-sales
     * @returns {Promise} Sale[]
     */
    async getSalesByAdminId(adminId: number): Promise<Sale[]> {
        Logger.log('Start Repository - SALE - ', this.getSalesByAdminId.name);
        const sales = await Sale.getSalesByAdminId(adminId);
        Logger.log('End Repository - SALE - ', this.getSalesByAdminId.name);
        return sales;
    }

    /**
     * Get the sale with the given id
     * @author mcastro
     * @param saleId the id of the sale you want to get
     * @returns {Promise} Sale
     */
    async getSaleById(saleId: number): Promise<Sale> {
        Logger.log('Start Repository - SALE - getSaleById');
        const sale = await Sale.getSaleById(saleId);
        Logger.log('End Repository - SALE - getSaleById');
        return sale;
    }

    /**
     * Get the sale with the given id
     * @author mcastro
     * @param saleId the id of the sale you want to get
     * @returns {Promise} Sale
     */
    async getSaleByIdAndWorkerAdminInfo(saleId: number): Promise<Sale> {
        Logger.log('Start Repository -  SALE - ', this.getSaleByIdAndWorkerAdminInfo.name);
        const sale = await Sale.getSaleWithExtraInfo(saleId);
        Logger.log('End Repository -  SALE - ', this.getSaleByIdAndWorkerAdminInfo.name);
        return sale;
    }
}
