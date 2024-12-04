import { ProfileTabs } from "@/constants/navigation";
import { IMessage } from "./common";
import { IRecipe } from "./recipe";

export interface IUser {
  name: string;
  email: string;
  password: string;
  id: string | null;
  favoritesId?: string;
}

export interface IUserResponse {
  message: string;
  user: IUser;
}

export interface IUserState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  message: IMessage | undefined;
  favorites: IRecipe[] | null;
  currentProfileTab: ProfileTabs;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export enum Autocomplete {
  newPassword = "new-password",
  currentPassword = "currentPassword",
  off = "off",
  email = "email",
}
