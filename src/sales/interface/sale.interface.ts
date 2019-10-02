import { Document } from 'mongoose';
import { UserTypeEnum } from 'src/common/enums/user-role.enum';
import { UserModel } from 'src/users/interface/user.interface';
import { ObjectId } from 'bson';

export default interface CreateSale {
    workerId: number;
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
