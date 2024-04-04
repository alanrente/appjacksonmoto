import { LogoutComponent } from "../components/LogoutComponent";
import { IAuthProvider } from "../interfaces/provider.interface";
import { User } from "../interfaces/login.interface";

export const authProvider: IAuthProvider = {
  isAuthenticated: false,
  username: null,
  description: "Você não está logado!",
  icon() {
    return LogoutComponent;
  },
  async signin({ usuario, chave }: User) {
    sessionStorage.setItem("@token", JSON.stringify({ chave }));
    authProvider.isAuthenticated = true;
    authProvider.username = usuario;
    authProvider.description = `Bem vindo ${usuario}`;
  },

  async signout() {
    await new Promise((r) => setTimeout(r, 800)); // fake delay
    sessionStorage.removeItem("@token");
    authProvider.isAuthenticated = false;
    authProvider.username = "";
    authProvider.description = "Você não está logado!";
  },
};
