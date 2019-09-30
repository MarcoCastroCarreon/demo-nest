import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleSchema } from 'src/entities/mongo/models/sale.model';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { UserSchema } from 'src/entities/mongo/models/user.model';
import { CandySchema } from 'src/entities/mongo/models/candy.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Sale', schema: SaleSchema }, { name: 'User', schema: UserSchema }, { name: 'Candy', schema: CandySchema }])],
    controllers: [SalesController],
    providers: [SalesService],
})
export class SalesModule { }
