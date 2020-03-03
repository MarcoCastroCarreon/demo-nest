import moment from 'moment';
import { Injectable, ConflictException, Logger, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import CreateSale, { SaleModel, CandyModel, CreateSaleResponse, GetSalesResponse, GetSaleResponse } from './interface/sale.interface';
import { UserRepository } from 'src/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModel } from 'src/users/interface/user.interface';
import { Sale } from 'src/entities/sale.entity';
import { SalesStatusEnum } from 'src/common/enums/sale-status.enum';
import { SaleRepository } from 'src/repositories/sale.repository';

@Injectable()
export class SalesService {
    constructor(
        @InjectModel('Sale')
        private saleModel: Model<SaleModel>,
        @InjectModel('User')
        private userModel: Model<UserModel>,
        @InjectModel('Candy')
        private candyModel: Model<CandyModel>,
        @InjectRepository(User)
        private userRepository: UserRepository,
        @InjectRepository(Sale)
        private saleRepository: SaleRepository,
    ) { }


    /**
     * Creates a new sale in the MySQL database and a registry in the Mongo database
     * @author mcastro
     * @param sale the sale you want to create
     * @returns {Object} CreatedSale 
     */
    async createSale(sale: CreateSale): Promise<CreateSaleResponse> {
        Logger.log('Service Start - SALE - createSale');
        const user = await this.userRepository.findById(sale.workerId);
        if (!user)
            throw new NotFoundException(`user with id ${sale.workerId} does not exist`);

        const adminUser = await this.userRepository.findAdminById(sale.adminId);
        if (!adminUser)
            throw new NotFoundException(`user with id ${sale.adminId} does not exist`);

        const worker: UserModel = new this.userModel();
        worker.mySqlId = user.id;
        worker.userType = user.userType;

        const admin: UserModel = new this.userModel();
        admin.mySqlId = adminUser.id;
        admin.userType = adminUser.userType;

        const candys: CandyModel[] = [];
        if (sale.sale && sale.sale.length) {
            for (const candy of sale.sale) {
                const cdy = new this.candyModel();
                cdy.name = candy.name;
                cdy.cost = candy.cost;
                candys.push(cdy);
            }
        }

        const newSale = new this.saleModel();
        newSale.admin = admin;
        newSale.worker = worker;
        newSale.candys = candys;

        const saleSQL = new Sale();
        saleSQL.admin = adminUser;
        saleSQL.worker = user;
        saleSQL.mongoId = newSale._id.toString();
        saleSQL.status = sale.sale ? SalesStatusEnum.IN_PROGRESS : SalesStatusEnum.CREATED;
        saleSQL.creationDate = moment(moment.now(), 'x').toDate();
        saleSQL.lastUpdateDate = moment(moment.now(), 'x').toDate();

        newSale.mySqlId = saleSQL.id;

        try {
            await this.saleRepository.saveSale(saleSQL);
            await newSale.save();
        } catch (errors) {
            Logger.warn(errors);
            await this.saleRepository.deleteSale(saleSQL);
            this.saleModel.remove(newSale);
            throw new InternalServerErrorException(`${errors}`);
        }

        Logger.log('Service End - SALE - createSale');
        return {
            id: saleSQL.id,
            worker: user.name,
            admin: adminUser.name,
            sale: candys ? candys.map(candy => candy.name).filter(item => item) : [],
        };
    }


    /**
     * Get a list of sales of the current user
     * @author mcastro
     * @param adminId the id of the admin you want to get the sales
     * @returns {Promise} Sales[]
     */
    async getSales(adminId: number): Promise<GetSalesResponse[]> {
        Logger.log('Service Start - SALE - getSales');

        const user = await this.userRepository.findAdminById(adminId);
        if (!user)
            throw new NotFoundException(`admin with id ${adminId} not exist or`);

        const sales = await this.saleRepository.getSalesByAdminId(adminId);
        if (!sales.length)
            return [];

        const responseSales = sales.map(({ id, status, worker, creationDate, mongoId, finishedDate }) => ({
            id,
            status,
            mongoId,
            worker: worker.name,
            creationDate,
            candys: null,
            finishedDate,
        }));

        for (const sale of responseSales) {
            const candys = this.saleModel.findById(sale.mongoId);
            Logger.log(candys);
            sale.candys = (await candys).candys;
            delete sale.mongoId;
        }
        Logger.log('Service End - SALE - getSales');
        return responseSales;
    }

    /**
     * update the sale with the given id, adding candys and finishing the sale or just finishing the sale
     * @author mcastro
     * @param saleId the id of the sale you want to update
     * @param candys the list of candys to add
     * @param finished this param is use just in case to finish the sale and changes the sale status
     * @returns {Promise} void
     */
    async addCandysAndFinishedSale(saleId: number, candys?: CandyModel[], finished?: boolean): Promise<void> {
        Logger.log('Service Start - SALE - addCandysAndFinisehdSale');

        const sale = await this.saleRepository.getSaleById(saleId);
        if (!sale)
            throw new NotFoundException(`sale with id ${saleId} not found or finished`);

        const mongoSale = await this.saleModel.findById(sale.mongoId);

        if (candys.length) {
            for (const candy of candys) {
                mongoSale.candys.push(candy);
            }
        }

        if (finished)
            sale.status = SalesStatusEnum.CLOSED;

        Logger.log('Service End - SALE - addCandysAndFinisehdSale');
    }

    /**
     * @author mcastro
     * @param saleId the id of the sale you want to get
     * @returns {Promise} Sale
     */
    async getSale(saleId: number): Promise<any> {
        Logger.log('Service Start - SALE - getSale');

        try {
            const sale = await this.saleRepository.getSaleById(saleId);
            if (!sale)
                throw new NotFoundException(`sale with id ${saleId} not found`);

            const response: GetSaleResponse = {
                id: sale.id,
                status: sale.status,
                worker: sale.worker.name,
                admin: sale.admin.name,
                candys: await this.saleModel.findById(sale.mongoId).then(mongoSale => mongoSale.candys.map(candy => candy.name).filter(item => item)),
                creationDate: sale.creationDate,
                lastUpdatedDate: sale.lastUpdateDate
            }

            Logger.log('Service End - SALE - getSale');
            return response;
        } catch (error) {
            Logger.log('Service Error - SALE ==>', error);
            throw new InternalServerErrorException('Service Failed');
        }
    }
}
