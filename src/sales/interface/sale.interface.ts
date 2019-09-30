import { Document } from 'mongoose';
import { UserTypeEnum } from 'src/common/enums/user-role.enum';

export default interface CreateSale {
    workerId: number;
    sale?: CandyModel[];
}

export interface CandyModel extends Document {
    name: string;
    cost: number;
}

export interface SaleModel extends Document {
    worker: UserSale;
    admin: UserSale;
    candys: CandyModel[];
}

export interface UserSale {
    id: number;
    name: string;
    email: string;
    userType: UserTypeEnum;
}
