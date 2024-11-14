import IUser from "./IUser";

interface IUserState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
}

export default IUserState;
