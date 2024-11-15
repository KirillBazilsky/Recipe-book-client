export interface IUser {
  name: string;
  email: string;
  password: string;
  _id: string | null;
}

export interface IUserResponse {
  message: string;
  user: IUser;
}

export interface IUserState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
}

export interface IUserCredentials {
  email: string;
  password: string
};

