import { RouteObject } from "react-router-dom";

export enum ERouteObject {
  root = "root",
  servicos = "servicos",
  home = "home",
  sair = "sair",
  index = "index",
}

export interface IRouteObject {
  [key: string]: RouteObject;
}
