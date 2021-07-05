import { SERVER_URL } from "libs/const";
import axiosInstance from "./axiosInstance";

export const getTimer = async (id) => {
    return axiosInstance.get(`${SERVER_URL}/masters/timer/${id}`);
};
