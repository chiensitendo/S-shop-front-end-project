export interface LoginResponse {
    id: number;
    email: string;
    roles: Array<number>;
    firstname?: string;
    lastname?: string;
    username: string;
    expiredTime: number;
    accountType: number;
    accessToken: string;
    refreshToken: string;
    isCompleted: boolean;
    avatarUrl?: string;   
}