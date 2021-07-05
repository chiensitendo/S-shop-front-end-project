import { SERVER_URL } from "libs/const";
import axiosInstance from "./axiosInstance";

export const getTimer = async (id) => {
    return axiosInstance.get(`${SERVER_URL}/masters/timer/${id}`);
};

export const getVisit = async (id) => {
    return axiosInstance.get(`${SERVER_URL}/masters/visit/${id}`);
};

export const updateVisit = async (id) => {
    return axiosInstance.put(`${SERVER_URL}/masters/visit/${id}`);
};

