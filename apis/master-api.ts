import { SERVER_API_URL } from "libs/const";
import axiosInstance from "./axiosInstance";
import axiosNoLoadingInstance from "./axiosNoLoadingInstance";
import { SubscribeRequest } from "./models/requests/subscribe_request";
import { ProvinceListItem } from "./models/responses/provinceListItem";

export const getTimer = async (id) => {
    return axiosInstance.get(`${SERVER_API_URL}/masters/timer/${id}`);
};

export const getVisit = async (id) => {
    return axiosInstance.get(`${SERVER_API_URL}/masters/visit/${id}`);
};

export const updateVisit = async (id) => {
    return axiosInstance.put(`${SERVER_API_URL}/masters/visit/${id}`);
};

export const insertSubscribe = async (req: SubscribeRequest) => {
    return axiosInstance.post(`${SERVER_API_URL}/subscribe`, req);
};

export const getProvinces = async () => {
    return axiosNoLoadingInstance.get<ProvinceListItem[]>(`${SERVER_API_URL}/masters/provinces`);
};

