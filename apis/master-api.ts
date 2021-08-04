import { SERVER_API_URL } from "libs/const";
import axiosInstance from "./axiosInstance";

export const getTimer = async (id) => {
    return axiosInstance.get(`${SERVER_API_URL}/masters/timer/${id}`);
};

export const getVisit = async (id) => {
    return axiosInstance.get(`${SERVER_API_URL}/masters/visit/${id}`);
};

export const updateVisit = async (id) => {
    return axiosInstance.put(`${SERVER_API_URL}/masters/visit/${id}`);
};

export const insertSubscribe = async (email) => {
    return axiosInstance.post(`${SERVER_API_URL}/subscribe`, {
        email: email
    });
};

