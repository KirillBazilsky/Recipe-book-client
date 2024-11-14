import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import ICredentials from "../interfaces/ICredentials";
import IUser from "../interfaces/IUser";
import { API_URL } from "../constants";
import IUserResponse from "../interfaces/IResponse";

export const registerRequest = async (params: AxiosRequestConfig<IUser>) => {
  const response: AxiosResponse<IUserResponse> = await axios.post(
    `${API_URL}auth/register`,
    params
  );

  return response;
};

export const loginRequest = async (params: AxiosRequestConfig<ICredentials>) => {
  const response: AxiosResponse<IUserResponse> = await axios.post(
    `${API_URL}auth/login`,
    params
  );
  return response;
};
