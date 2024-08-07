import { createBrowserRouter } from "react-router-dom";
import { authProvider } from "../contexts/auth.context";
import { Layout } from "../Pages/Layout";
import LoginComponent from "../components/Login";
import { protectedLoader } from "../contexts/protectedLoader.context";
import { HomePage } from "../Pages/HomePage";
import { ServicosPage } from "../Pages/Servicos";
import { IRouteObject, ERouteObject } from "../interfaces/router.interface";
import validateInfosChildren from "../utils/validateInfosChildren.util";
import { OsPage } from "../Pages/Os";
import { Relatorio } from "../Pages/Relatorio";

export const infosRouterChildren: IRouteObject = {
  [ERouteObject.index]: {
    id: "index",
    index: true,
    Component: LoginComponent,
  },
  // [ERouteObject.home]: {
  //   id: "Home",
  //   path: "home",
  //   element: <HomePage />,
  //   loader: protectedLoader,
  // },
  [ERouteObject.os]: {
    id: "Ordem Serviço",
    path: ERouteObject.os,
    loader: protectedLoader,
    element: <OsPage />,
  },
  [ERouteObject.relatorio]: {
    id: "Relatório",
    path: ERouteObject.relatorio,
    loader: protectedLoader,
    element: <Relatorio />,
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
