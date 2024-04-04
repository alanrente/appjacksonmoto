import { User } from "./login.interface";
export interface IAuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  description?: string;
  signin(user: User): Promise<void>;
  signout(): Promise<void>;
  icon: any;
}
