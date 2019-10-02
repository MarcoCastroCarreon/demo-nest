import { UserTypeEnum } from 'src/common/enums/user-role.enum';

export class UserSale {
    id: number;
    name: string;
    email: string;
    userType: UserTypeEnum;
}
