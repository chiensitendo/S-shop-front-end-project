export enum RULE_TYPE {
    REQUIRED = 1,
    PASSWORD = 2,
    CHECKBOX_REQUIRED = 3,
    EMAIL = 4
}

export type Choice = {
    id: number;
    label: string;
    value: any;
}

export type LocalStorageUserModel = {
    id: number;
    token: string;
    refreshToken: string;
    tokenType: string;
    roles: Array<number>;
    expiredTime: number;
    username: string;
    isCompleted: boolean;
    email: string;
    info?: LocalStorageUserInfoModel;
}

export type LocalStorageUserInfoModel = {
    firstName?: string;
    lastName?: string;
    id: number;
    avatarUrl?: string; 
}