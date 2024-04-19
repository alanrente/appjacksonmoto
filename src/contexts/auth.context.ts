import { LogoutComponent } from "../components/Logout";
import { IAuthProvider } from "../interfaces/provider.interface";
import { User } from "../interfaces/login.interface";
import { login } from "../services/login.service";

export const hasUser = () => {
  return !!sessionStorage.getItem("@user");
};

const getDescription = (usuario?: string) => {
  const user = JSON.parse(sessionStorage.getItem("@user") || "{}") as User;
  if (!user || !user.usuario) return "Você não está logado!";
  return `Bem vindo ${usuario || user.usuario}`;
};

export const authProvider: IAuthProvider = {
  isAuthenticated: hasUser(),
  username: null,
  description: getDescription(),
  hasUser,
  icon() {
    return LogoutComponent;
  },
  async signin({ usuario, senha }: User) {
    const infosUser = await login({ senha, usuario });
    sessionStorage.setItem("@user", JSON.stringify(infosUser));
    authProvider.isAuthenticated = true;
    authProvider.username = usuario;
    authProvider.description = getDescription(infosUser.usuario);
  },

  async signout() {
    await new Promise((r) => setTimeout(r, 800)); // fake delay
    sessionStorage.removeItem("@user");
    authProvider.isAuthenticated = false;
    authProvider.username = "";
    authProvider.description = "Você não está logado!";
  },
};
