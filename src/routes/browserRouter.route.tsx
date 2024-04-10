import { createBrowserRouter } from "react-router-dom";
import { authProvider } from "../contexts/auth.context";
import { Layout } from "../Pages/Layout";
import LoginComponent from "../components/LoginComponent";
import { protectedLoader } from "../contexts/protectedLoader.context";
import { HomePage } from "../Pages/HomePage";
import { ServicosPage } from "../Pages/ServicosPage";
import { IRouteObject, ERouteObject } from "../interfaces/router.interface";
import validateInfosChildren from "../utils/validateInfosChildren.util";
import { OsPage } from "../Pages/OsPage";

export const infosRouterChildren: IRouteObject = {
  [ERouteObject.index]: {
    id: "index",
    index: true,
    Component: LoginComponent,
  },
  [ERouteObject.home]: {
    id: "Home",
    path: "home",
    element: <HomePage />,
    loader: protectedLoader,
  },
  [ERouteObject.os]: {
    id: "OS's",
    path: ERouteObject.os,
    loader: protectedLoader,
    element: <OsPage />,
  },
  [ERouteObject.servicos]: {
    id: "Serviços",
    path: "servicos",
    loader: protectedLoader,
    element: <ServicosPage />,
  },
  [ERouteObject.sair]: {
    id: "Sair",
    path: "logout",
  },
};

validateInfosChildren(infosRouterChildren);

export const infosRouteDefault: IRouteObject = {
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

export const router = createBrowserRouter([
  infosRouteDefault[ERouteObject.root],
]);
