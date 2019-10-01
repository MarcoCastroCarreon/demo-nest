import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { SaleSchema } from 'src/entities/mongo/models/sale.model';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { UserSchema } from 'src/entities/mongo/models/user.model';
import { CandySchema } from 'src/entities/mongo/models/candy.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Sale', schema: SaleSchema }, { name: 'User', schema: UserSchema }, { name: 'Candy', schema: CandySchema } ]), TypeOrmModule.forFeature([UserRepository])],
    controllers: [SalesController],
    providers: [SalesService],
    exports: [MongooseModule],
})
export class SalesModule { }
