export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const SERVER_API_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
export const TIMER_ID: number = +process.env.NEXT_PUBLIC_TIMER_ID;
export const ViSIT_ID: number = +process.env.NEXT_PUBLIC_VISIT_ID;

export enum LANGUAGE  {
    VIETNAM = "vi",
    ENGLISH = "en"
}