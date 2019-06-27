export enum UserRoleEnum {
    ADMIN = 'ADMIN',
    WORKER = 'WORKER'
}

export const parseRole = (value: string) => {
    if(!value)
        return null;
    
        switch (value) {
            case UserRoleEnum.ADMIN:
                return UserRoleEnum.ADMIN;
            case UserRoleEnum.WORKER:
                return UserRoleEnum.WORKER;
            default:
                return null;
        }
}