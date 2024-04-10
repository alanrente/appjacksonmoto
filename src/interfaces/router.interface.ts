import { RouteObject } from "react-router-dom";

export enum ERouteObject {
  root = "root",
  servicos = "servicos",
  os = "os",
  home = "home",
  sair = "sair",
  index = "index",
}

type IRouteObjectUnprotected = {
  unprotected?: boolean;
};

export type IRouteObject = {
  [key: string]: RouteObject & IRouteObjectUnprotected;
};
