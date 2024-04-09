import { User } from "../interfaces/login.interface";
import { ESession } from "./constants.util";

const setUser = (value: any) => {
  sessionStorage.setItem(ESession.user, JSON.stringify(value));
};
const getUser = () => {
  return JSON.parse(sessionStorage.getItem(ESession.user) || "{}") as User;
};
const removeUser = () => {
  sessionStorage.removeItem(ESession.user);
};

export { setUser, getUser, removeUser };
