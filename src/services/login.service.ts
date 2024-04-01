import { User } from "../interfaces/login.interface";
import { api } from "./axios.service";

export const login = async ({ senha, usuario }: User) => {
  const { data } = await api.post("/auth", { senha, usuario });

  const { token } = data as { token: string };

  return token;
};
