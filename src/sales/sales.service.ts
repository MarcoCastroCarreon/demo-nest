import { Injectable, ConflictException, Logger } from '@nestjs/common';
import CreateSale, { SaleModel, CandyModel } from './interface/sale.interface';
import { UserRepository } from 'src/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModel } from 'src/users/interface/user.interface';

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
    ) {}

    async createSale(sale: CreateSale) {
        const newSale = new this.saleModel();
        const user = await this.userRepository.findById(sale.workerId);
        if (!user)
            throw new ConflictException(`user with id ${sale.workerId} does not exist`);

        const worker: UserModel = new this.userModel();
        worker.mySqlId = user.id;
        worker.userType = user.userType;

        const candys: CandyModel[] = [];
        for (const candy of sale.sale) {
            const cdy = new this.candyModel();
            cdy.name = candy.name;
            cdy.cost = candy.cost;
            candys.push(cdy);
        }

        newSale.worker = worker;
        newSale.candys = candys;

        Logger.log(newSale);

        await newSale.save();
    }
}
