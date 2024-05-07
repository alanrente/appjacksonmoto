import "./style.css";
import { Outlet, useNavigate } from "react-router-dom";
import { authProvider } from "../../contexts/auth.context";
import { Button, Skeleton } from "antd";
import {
  infosRouteDefault,
  infosRouterChildren,
  router,
} from "../../routes/browserRouter.route";
import { LogoutComponent } from "../../components/Logout";
import { ERouteObject } from "../../interfaces/router.interface";
import { useLayout } from "./hook";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import LoginComponent from "../../components/Login";

export function Layout() {
  const { isAuthenticated } = authProvider;
  const navigate = useNavigate();
  const { serverIsOnline, visible, refSideBar, setvisible } = useLayout();

  return (
    <>
      {/* {!serverIsOnline ? (
        <>
          <span style={{ marginLeft: ".5rem" }}>Carregando sistema...</span>
          <Skeleton
            active
            prefixCls="skeleton-antd"
            paragraph={{ rows: 3 }}
            title={{ width: "100%", style: { height: "20vh", marginTop: 0 } }}
          />
        </>
      ) : ( */}
      <div className="App">
        {!isAuthenticated ? (
          <LoginComponent />
        ) : (
          <div className="App" key={Layout.name}>
            <div
              ref={refSideBar}
              className={`${visible ? "App-sider" : "App-sider__close"}`}
            >
              <div className="App-sider__buttons">
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
                        <LogoutComponent
                          key={route.id}
                          onClick={() => setvisible(false)}
                        />
                      ) : (
                        <Button
                          key={route.id}
                          style={{
                            padding: "0",
                            width: "100%",
                          }}
                          onClick={() => {
                            setvisible(false);
                            navigate(`/${route.path}`);
                          }}
                        >
                          {`${route.id}`.substring(0, 10)}
                        </Button>
                      );
                    })}
              </div>
            </div>
            <div className="App-content">
              <div className="App-header">{authProvider.description}</div>
              <div className="App-body">
                <Outlet />
              </div>
              <Button
                style={{
                  position: "absolute",
                  zIndex: 999,
                  left: "5px",
                  color: visible ? "var(--main-bg-color)" : "#FFF",
                  bottom: "5px",
                  width: "60px",
                  height: "45px",
                  backgroundColor: visible ? "" : "var(--main-bg-color)",
                }}
                onClick={() => setvisible(!visible)}
              >
                {visible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
}
