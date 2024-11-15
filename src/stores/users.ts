import { defineStore } from "pinia";
import { getUserById, loginRequest, registerRequest } from "../api/users";

import {
  IUser,
  IUserState,
  IUserResponse,
  IUserCredentials,
} from "../interfaces/user";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { checkAuthState } from "@/lib/authStateChecker.js";
import { SESSION_EXPIRATION_TIME } from "@/constants/appConstants";

export const useUsersStore = defineStore("user", {
  state: (): IUserState => ({
    currentUser: null,
    isAuthenticated: checkAuthState(),
  }),
  actions: {
    async fetchCurrentUser(payload: string) {
      const response: AxiosResponse<IUserResponse> = await getUserById(
        payload
      );
      this.currentUser = response.data.user;
    },
    async register(payload: AxiosRequestConfig<IUser>) {
      const response: AxiosResponse<IUserResponse> = await registerRequest(
        payload
      );

      this.currentUser = response.data.user;

      if(this.currentUser && this.currentUser._id) {
        localStorage.setItem("currentUserId", this.currentUser._id);
      }
      
      this.isAuthenticated = true;

      localStorage.setItem("isAuthenticated", this.isAuthenticated.toString());
      localStorage.setItem("authExpirationTime", SESSION_EXPIRATION_TIME);

      return response;
    },

    async login(payload: AxiosRequestConfig<IUserCredentials>) {
      const response: AxiosResponse<IUserResponse> = await loginRequest(
        payload
      );

      this.currentUser = response.data.user;

      if (this.currentUser && this.currentUser._id) {
        localStorage.setItem("currentUserId", this.currentUser._id);
      } 

      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", this.isAuthenticated.toString());

      localStorage.setItem("authExpirationTime", SESSION_EXPIRATION_TIME);

      return response;
    },

    logout() {
      this.currentUser = null;
      this.isAuthenticated = false;

      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authExpirationTime');
      localStorage.removeItem('currentUserId');
    },
  },
  getters: {
    isUserAuthenticated: (state) => state.isAuthenticated,
    getCurrentUser: (state) => state.currentUser,
  },
});