import { createBrowserRouter } from "react-router-dom";
import { authProvider } from "../contexts/auth.context";
import { Layout } from "../Pages/Layout";
import LoginComponent from "../components/LoginComponent";
import { LogoutComponent } from "../components/LogoutComponent";
import { protectedLoader } from "../contexts/protectedLoader.context";
import { HomePage } from "../Pages/HomePage";
import { ServicosPage } from "../Pages/HomePage/ServicosPage";
import { IRouteObject, ERouteObject } from "../interfaces/router.interface";

export const infosRouterChildren: IRouteObject = {
  [ERouteObject.index]: {
    id: "index",
    index: true,
    Component: LoginComponent,
  },
  [ERouteObject.sair]: {
    id: "Sair",
    path: "logout",
    Component: LogoutComponent,
  },
  [ERouteObject.home]: {
    id: "Home",
    path: "home",
    loader: protectedLoader,
    Component: HomePage,
  },
  [ERouteObject.servicos]: {
    id: "Serviços",
    path: "servicos",
    loader: protectedLoader,
    Component: ServicosPage,
  },
};

export const infosRouter: IRouteObject = {
  [ERouteObject.root]: {
    id: "root",
    path: "/",
    loader() {
      return { user: authProvider.username };
    },
    Component: Layout,
    errorElement: <>Página não encontrada</>,
    children: Object.keys(infosRouterChildren)
      .filter((key) => key !== ERouteObject.root)
      .map((keyInfo) => infosRouterChildren[keyInfo]),
  },
};

export const router = createBrowserRouter([infosRouter[ERouteObject.root]]);
