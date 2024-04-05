import { createBrowserRouter } from "react-router-dom";
import { authProvider } from "../contexts/auth.context";
import { Layout } from "../Pages/Layout";
import LoginComponent from "../components/LoginComponent";
import { LogoutComponent } from "../components/LogoutComponent";
import { protectedLoader } from "../contexts/protectedLoader.context";
import { HomePage } from "../Pages/HomePage";
import { ServicosPage } from "../Pages/HomePage/ServicosPage";
import { IRouteObject, ERouteObject } from "../interfaces/router.interface";

function validateInfosChildren(children: IRouteObject) {
  const keysChildren = Object.keys(children);
  const keysEnum = Object.values(ERouteObject).map((obj) => obj.toString());

  keysChildren.forEach((children) => {
    const hasDiff = !keysEnum.includes(children);

    if (hasDiff) {
      throw new Error(`Rota "${children}" não entrada no enum de rotas`);
    }
  });
}

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
    unprotected: true,
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
    Component: LogoutComponent,
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
