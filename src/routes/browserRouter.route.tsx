import { createBrowserRouter } from "react-router-dom";
import { authProvider } from "../contexts/auth.context";
import { Layout } from "../Pages/Layout";
import LoginComponent from "../components/LoginComponent";
import { LogoutComponent } from "../components/LogoutComponent";
import { protectedLoader } from "../contexts/protectedLoader.context";
import { HomePage } from "../Pages/HomePage";
import { ServicosPage } from "../Pages/HomePage/ServicosPage";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: authProvider.username };
    },
    Component: Layout,
    errorElement: <>Página não encontrada</>,
    children: [
      {
        index: true,
        Component: LoginComponent,
      },
      {
        id: "Sair",
        path: "logout",
        Component: LogoutComponent,
      },
      {
        id: "Home",
        path: "home",
        loader: protectedLoader,
        Component: HomePage,
      },
      {
        id: "Serviços",
        path: "servicos",
        loader: protectedLoader,
        Component: ServicosPage,
      },
    ],
  },
]);
