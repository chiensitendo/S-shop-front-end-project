import { SERVER_URL } from "libs/const";
import axiosInstance from "./axiosInstance";

export const getTimer = async (id) => {
    return axiosInstance.get(`${SERVER_URL}/masters/timer/${id}`);
};

export const setTimer  = async (id: number, value: string, type: string) => {
    let req = {
        value: value,
        type: type
    }
    return axiosInstance.post(`${SERVER_URL}/masters/timer/${id}`, req);
}