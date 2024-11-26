import { IMessage } from "./common";

export interface IUser {
  name: string;
  email: string;
  password: string;
  id: string | null;
}

export interface IUserResponse {
  message: string;
  user: IUser;
}

export interface IUserState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  message: IMessage | undefined;
}

export interface IUserCredentials {
  email: string;
  password: string
};

export enum Autocomplete {
  newPassword = 'new-password',
  currentPassword = 'currentPassword',
  off="off",
  email="email"
}