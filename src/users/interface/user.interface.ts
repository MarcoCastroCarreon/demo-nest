import { Document, DocumentQuery, Query } from 'mongoose';
import { UserTypeEnum } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    status: string;
    token?: string;
}

export interface UserModel extends Document {
    mySqlId: number;
    userType: UserTypeEnum;
}

export interface UserLoginBody {
    email: string;
    password: string;
}

export interface UserLoginReponse {
    access_token: string;
}

export interface UserGetAllResponse {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
}
