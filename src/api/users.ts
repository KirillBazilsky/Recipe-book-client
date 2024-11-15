import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUser, IUserResponse, IUserCredentials } from "@/interfaces/user";
import { BASE_URL } from "@/constants/apiConstants.js";

export const registerRequest = async (params: AxiosRequestConfig<IUser>) => {
  const response: AxiosResponse<IUserResponse> = await axios.post(
    `${BASE_URL}/auth/register`,
    params
  );

  return response;
};

export const loginRequest = async (params: AxiosRequestConfig<IUserCredentials>) => {
  const response: AxiosResponse<IUserResponse> = await axios.post(
    `${BASE_URL}/auth/login`,
    params
  );

  return response;
};

export const getUserById = async (userId: string) => {
  const response: AxiosResponse<IUserResponse> = await axios.get(
    `${BASE_URL}/users/${userId}`
  );

  return response;
};