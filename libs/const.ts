import { Choice } from "./types";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const SERVER_API_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
export const TIMER_ID: number = +process.env.NEXT_PUBLIC_TIMER_ID;
export const ViSIT_ID: number = +process.env.NEXT_PUBLIC_VISIT_ID;
export const LOCALSTORAGE_KEY = process.env.NEXT_PUBLIC_LOCAL_STORAGE;
export const FULL_DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export enum LANGUAGE  {
    VIETNAM = "vi",
    ENGLISH = "en"
}

export enum ROLES {
    ADMIN = 0,
    CUSTOMER = 1
}
export enum ACCOUNT_TYPE {
    NORMAL = 3,
    GOOGLE = 1,
    FACEBOOK = 2
}

export enum HTTP_STATUS {
    OK = 200,
    INTERNAL_SERVER_ERROR = 500,
    BAD_REQUEST = 401,
    NOT_FOUND = 400,
    UNAUTHORIZED = 403,
    TOKEN_NOT_FOUND = 405,
    NOT_VERIFIED = 406
}

export const GENDERS: Choice[] = [
    {
        id: 1,
        label: "Nam",
        value: 1
    },
    {
        id: 2,
        label: "Nữ",
        value: 2
    },
    {
        id: 3,
        label: "Khác",
        value: 3
    },     
]

export const BlogCategories = [
    'Travel',
    'Food',
    'Bussiness',
    'News',
    'IT',
    'Feeling'
]