import { Document } from 'mongoose';
import { UserTypeEnum } from 'src/common/enums/user-role.enum';

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    status: string;
    token?: string;
}

export interface UserModel extends Document {
    id: number;
    name: string;
    email: string;
    userType: UserTypeEnum;
}
