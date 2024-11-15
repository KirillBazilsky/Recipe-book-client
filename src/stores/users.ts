import { defineStore } from "pinia";
import { loginRequest, registerRequest } from "../api/users";

import { IUser, IUserState, IUserResponse, IUserCredentials} from "../interfaces/user";
import { AxiosRequestConfig, AxiosResponse } from "axios";

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

    async login(payload: AxiosRequestConfig<IUserCredentials>) {
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
