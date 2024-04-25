import { Button, ButtonProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { authProvider } from "../../contexts/auth.context";
import { infosRouteDefault } from "../../routes/browserRouter.route";
import { ERouteObject } from "../../interfaces/router.interface";
import { QueryCache } from "@tanstack/react-query";

type Props = ButtonProps;

export function LogoutComponent({ onClick }: Props) {
  const navigate = useNavigate();
  const queryCache = new QueryCache();
  const { signout } = authProvider;
  const [isLoggingOut, setisLoggingOut] = useState(false);

  async function handleOnclick(e: any) {
    setisLoggingOut(true);
    await signout();
    navigate(`${infosRouteDefault[ERouteObject.root].path}`);
    queryCache.clear();
    setisLoggingOut(false);
    onClick && onClick(e);
  }

  return (
    <Button
      loading={isLoggingOut}
      onClick={handleOnclick}
      className="logout-component"
    >
      Sair
    </Button>
  );
}
