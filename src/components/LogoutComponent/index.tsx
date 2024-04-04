import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { authProvider } from "../../contexts/auth.context";
import { infosRouteDefault } from "../../routes/browserRouter.route";
import { ERouteObject } from "../../interfaces/router.interface";

export function LogoutComponent() {
  const navigate = useNavigate();
  const { signout } = authProvider;
  const [isLoggingOut, setisLoggingOut] = useState(false);
  async function onclick() {
    setisLoggingOut(true);
    await signout();
    navigate(`${infosRouteDefault[ERouteObject.root].path}`);
    setisLoggingOut(false);
  }

  return (
    <Button
      loading={isLoggingOut}
      onClick={onclick}
      className="logout-component"
    >
      Sair
    </Button>
  );
}
