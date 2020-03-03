import { Document } from 'mongoose';
import { UserModel } from 'src/users/interface/user.interface';
import { SalesStatusEnum } from 'src/common/enums/sale-status.enum';

export default interface CreateSale {
    workerId: number;
    adminId: number;
    sale?: CandyModel[];
}

export interface CandyModel extends Document {
    name: string;
    cost: number;
}

export interface SaleModel extends Document {
    worker: UserModel;
    admin: UserModel;
    mySqlId: number;
    candys: CandyModel[];
}

export interface CreateSaleResponse {
    id: number;
    worker: string;
    admin: string;
    sale: CandyModel[] | string[] | [];
}

export interface GetSalesResponse {
    id: number;
    status: SalesStatusEnum;
    worker: string;
    creationDate: Date;
    candys: any[];
    finishedDate: Date;
}

export interface GetSaleResponse {
    id: number;
    status: SalesStatusEnum;
    admin: string;
    worker: string;
    creationDate: Date;
    candys: CandyModel[] | string[];
    lastUpdatedDate: Date;
}