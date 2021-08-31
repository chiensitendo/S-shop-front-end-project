import { SERVER_API_URL, SERVER_URL } from "libs/const";
import axiosInstance from "./axiosInstance";
import { RegisterRequest } from "./models/requests/register_request";
import { VerifyRequest } from "./models/requests/verify_request";

export const registerUser = async (req: RegisterRequest) => {
    return axiosInstance.post(`${SERVER_API_URL}/users`, req);
};

export const googleLogin = async() =>  {
    return axiosInstance.get(`${SERVER_URL}/google/auth`);
}

export const verifyUser = async (req: VerifyRequest) => {
    return axiosInstance.post(`${SERVER_API_URL}/users/verify`, req);
};