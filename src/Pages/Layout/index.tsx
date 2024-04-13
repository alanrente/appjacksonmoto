import "./style.css";
import { Outlet, useNavigate } from "react-router-dom";
import { authProvider } from "../../contexts/auth.context";
import { Button, Divider, Skeleton, Space } from "antd";
import {
  infosRouteDefault,
  infosRouterChildren,
  router,
} from "../../routes/browserRouter.route";
import { LogoutComponent } from "../../components/LogoutComponent";
import { ERouteObject } from "../../interfaces/router.interface";
import { useLayout } from "./index.hook";

export function Layout() {
  const { isAuthenticated } = authProvider;
  const navigate = useNavigate();
  const { serverIsOnline } = useLayout();

  return (
    <>
      {!serverIsOnline ? (
        <Skeleton
          active
          prefixCls="skeleton-antd"
          paragraph={{ rows: 3 }}
          title={{ width: "100%", style: { height: "20vh", marginTop: 0 } }}
        />
      ) : (
        <div key={Layout.name}>
          <div className="App-header">{authProvider.description}</div>

          <Space
            style={{
              margin: "1vh 1vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
            {isAuthenticated &&
              router.routes
                .find(
                  (router) =>
                    router.id === infosRouteDefault[ERouteObject.root].id
                )
                ?.children?.filter(
                  (r) => r.id !== infosRouterChildren[ERouteObject.index].id
                )
                .map((route) => {
                  return route.id ===
                    infosRouterChildren[ERouteObject.sair].id ? (
                    <LogoutComponent key={route.id} />
                  ) : (
                    <Button
                      key={route.id}
                      style={{
                        width: "100px",
                        padding: "0",
                      }}
                      onClick={() => {
                        navigate(`/${route.path}`);
                      }}
                    >
                      {`${route.id}`.substring(0, 10)}
                    </Button>
                  );
                })}
          </Space>

          <Divider style={{ margin: "1vh 0" }} />

          <div className="App-body">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
