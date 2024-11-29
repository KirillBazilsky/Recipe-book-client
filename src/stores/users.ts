import { defineStore } from "pinia";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  getUserById,
  loginRequest,
  registerRequest,
  updateUserRequest,
} from "../api/users";
import {
  IUser,
  IUserState,
  IUserResponse,
  IUserCredentials,
} from "../interfaces/user";
import { checkAuthState } from "@/lib/authStateChecker.js";
import { sessionExpireTime } from "@/constants/appConstants.js";
import { messageType } from "@/interfaces/common";
import { IFavoritesParams } from "@/interfaces/favorites";
import {
  addFavoriteRequest,
  getUserFavoritesRequest,
  removeFavoriteRequest,
} from "@/api/favorites";
import { IRecipe } from "@/interfaces/recipe";
import { ProfileTabs } from "@/constants/navigationConstants";
import { NO_FAVORITES } from "@/constants/messages/errors";

export const useUsersStore = defineStore("user", {
  state: (): IUserState => ({
    currentUser: null,
    isAuthenticated: checkAuthState(),
    message: undefined,
    favorites: null,
    currentProfileTab: ProfileTabs.userForm,
  }),
  actions: {
    async fetchCurrentUser(payload: string) {
      const response: AxiosResponse<IUserResponse> = await getUserById(payload);
      this.currentUser = response.data.user;
      this.currentUser.password = "";
    },
    async register(payload: AxiosRequestConfig<IUser>) {
      const response: AxiosResponse<IUserResponse> = await registerRequest(
        payload
      );

      this.currentUser = response.data.user;

      if (this.currentUser && this.currentUser.id) {
        localStorage.setItem("currentUserId", this.currentUser.id);
      }

      this.isAuthenticated = true;

      localStorage.setItem("isAuthenticated", this.isAuthenticated.toString());
      localStorage.setItem("authExpirationTime", sessionExpireTime.toString());

      return response;
    },

    async login(payload: AxiosRequestConfig<IUserCredentials>) {
      const response: AxiosResponse<IUserResponse> = await loginRequest(
        payload
      );

      this.currentUser = response.data.user;

      if (this.currentUser && this.currentUser.id) {
        localStorage.setItem("currentUserId", this.currentUser.id);
      }

      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", this.isAuthenticated.toString());

      localStorage.setItem("authExpirationTime", sessionExpireTime.toString());

      return response;
    },

    logout() {
      this.currentUser = null;
      this.isAuthenticated = false;

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authExpirationTime");
      localStorage.removeItem("currentUserId");
    },

    async updateUser(userId: string, payload: AxiosRequestConfig<IUser>) {
      const response: AxiosResponse<IUserResponse> = await updateUserRequest(
        userId,
        payload
      );

      this.currentUser = response.data.user;

      if (this.currentUser && this.currentUser.id) {
        localStorage.setItem("currentUserId", this.currentUser.id);
      }

      this.isAuthenticated = true;

      localStorage.setItem("isAuthenticated", this.isAuthenticated.toString());
      localStorage.setItem("authExpirationTime", sessionExpireTime.toString());

      return response;
    },

    setMessage(value?: string, isError?: string) {
      if (!value) {
        this.message = undefined;

        return;
      }

      if (isError) {
        this.message = { value, type: messageType.error };

        return;
      }

      this.message = { value, type: messageType.info };
    },

    async addFavorite(
      favoriteId: string,
      payload: AxiosRequestConfig<IFavoritesParams>,
      recipe: IRecipe
    ) {
      const response: AxiosResponse = await addFavoriteRequest(
        favoriteId,
        payload
      );

      this.favorites = [...(this.favorites ?? []), recipe];

      if (favoriteId === "new-favorites" && payload.data?.userId) {
        this.fetchCurrentUser(payload.data?.userId);
      }

      return response;
    },

    async removeFavorite(
      favoriteId: string,
      payload: AxiosRequestConfig<{ recipeId: string }>
    ) {
      const response: AxiosResponse = await removeFavoriteRequest(
        favoriteId,
        payload
      );

      this.favorites =
        this.favorites?.filter(
          (recipe) => recipe._id !== payload.data?.recipeId
        ) ?? [];

      return response;
    },

    async getUserFavorites(userId: string) {
      try {
        const response: IRecipe[] = await getUserFavoritesRequest(userId);
        this.favorites = response;

        if(!response.length) {
          this.favorites = [];
          throw new Error(NO_FAVORITES);
        };

      } catch (error) {
        throw error;
      }
    },

    setCurrentProfileTab(tab: ProfileTabs) {
      this.currentProfileTab = tab;
    },
  },
  getters: {
    isUserAuthenticated: (state) => state.isAuthenticated,
    getCurrentUser: (state) => state.currentUser,
    getMessage: (state) => state.message,
    getFavorites: (state) => state.favorites,
    getCurrentProfileTab: (state) => state.currentProfileTab,
  },
});
