import { Document } from 'mongoose';
import { UserModel } from 'src/users/interface/user.interface';

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
    candys: CandyModel[];
}
