export enum UserTypeEnum {
    ADMIN = 'ADMIN',
    WORKER = 'WORKER',
}

export const parseRole = (value: string) => {
    if (!value)
        return null;

    switch (value) {
        case UserTypeEnum.ADMIN:
            return UserTypeEnum.ADMIN;
        case UserTypeEnum.WORKER:
            return UserTypeEnum.WORKER;
        default:
            return null;
    }
}