import { ERouteObject, IRouteObject } from "../interfaces/router.interface";

export default function validateInfosChildren(children: IRouteObject) {
  const keysChildren = Object.keys(children);
  const keysEnum = Object.values(ERouteObject).map((obj) => obj.toString());

  keysChildren.forEach((children) => {
    const hasDiff = !keysEnum.includes(children);

    if (hasDiff) {
      throw new Error(`Rota "${children}" não entrada no enum de rotas`);
    }
  });
}
