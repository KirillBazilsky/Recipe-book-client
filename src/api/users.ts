import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUser, IUserResponse, IUserCredentials } from "@/interfaces/user";
import { BASE_URL } from "@/constants/apiConstants.js";
import { api } from "./api";

export const registerRequest = async (params: AxiosRequestConfig<IUser>) => {
  const response: AxiosResponse<IUserResponse> = await api.post(
    `${BASE_URL}/auth/register`,
    params
  );

  return response;
};

export const loginRequest = async (
  params: AxiosRequestConfig<IUserCredentials>
) => {
  const response: AxiosResponse<IUserResponse> = await api.post(
    `${BASE_URL}/auth/login`,
    params
  );
    console.log(response)
  return response;
};

export const getUserById = async (userId: string) => {
  const response: AxiosResponse<IUserResponse> = await api.get(
    `${BASE_URL}/users/${userId}`
  );

  return response;
};

export const updateUserRequest = async (
  userId: string,
  params: AxiosRequestConfig<IUser>
) => {
  const response: AxiosResponse<IUserResponse> = await api.put(
    `${BASE_URL}/users/${userId}`,
    params
  );

  return response;
};
