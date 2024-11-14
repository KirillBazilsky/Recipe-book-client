import { defineStore } from "pinia";
import { loginRequest, registerRequest } from "../api/userApi";
import IUserState from "../interfaces/IUserState";
import IUser from "../interfaces/IUser";
import ICredentials from "../interfaces/ICredentials";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import IUserResponse from "../interfaces/IResponse";

export const useUsersStore = defineStore("user", {
  state: (): IUserState => ({
    currentUser: null,
    isAuthenticated: false,
  }),
  actions: {
    async register(payload: AxiosRequestConfig<IUser>) {
      const response: AxiosResponse<IUserResponse> = await registerRequest(payload);
      this.currentUser = response.data.user;
      this.isAuthenticated = true;
      return response
    },

    async login(payload: AxiosRequestConfig<ICredentials>) {
      const response:AxiosResponse<IUserResponse> = await loginRequest(payload);
      this.currentUser = response.data.user;
      this.isAuthenticated = true;
      return response
    },

    logout() {
      this.currentUser = null;
      this.isAuthenticated = false;
    },
  },
  getters: {
    isUserAuthenticated: (state) => state.isAuthenticated,
    getCurrentUser: (state) => state.currentUser,
  },
});
