import { Outlet, useNavigate } from "react-router-dom";
import { authProvider } from "../../contexts/auth.context";
import { Button, Divider, Space } from "antd";
import {
  infosRouter,
  infosRouterChildren,
  router,
} from "../../routes/browserRouter.route";
import { LogoutComponent } from "../../components/LogoutComponent";
import { ERouteObject } from "../../interfaces/router.interface";

export function Layout() {
  const { isAuthenticated } = authProvider;
  const navigate = useNavigate();

  return (
    <div key={Layout.name}>
      <div className="App-header">{authProvider.description}</div>

      <Space
        style={{
          margin: "1vh 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        {isAuthenticated &&
          router.routes
            .find((router) => router.id === infosRouter[ERouteObject.root].id)
            ?.children?.filter(
              (r) => r.id !== infosRouterChildren[ERouteObject.index].id
            )
            .map((route) =>
              route.id === infosRouterChildren[ERouteObject.sair].id ? (
                <LogoutComponent key={route.id} />
              ) : (
                <Button
                  key={route.id}
                  onClick={() => {
                    navigate(`/${route.path}`);
                  }}
                >
                  {route.id}
                </Button>
              )
            )}
      </Space>

      <Divider style={{ margin: "1vh 0" }} />

      <div className="App-body">
        <Outlet />
      </div>
    </div>
  );
}