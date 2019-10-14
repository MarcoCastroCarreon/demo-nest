export enum UserStatus {
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED',
    PENDING_ACCOUNT = 'PENDING_ACCOUNT',
}

export const filter = (value: string) => {
    if (!value) return null;

    switch (value) {
        case UserStatus.ENABLED:
            return UserStatus.ENABLED;
        case UserStatus.DISABLED:
            return UserStatus.DISABLED;
        }
};
