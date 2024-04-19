import { Button, ButtonProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { authProvider } from "../../contexts/auth.context";
import { infosRouteDefault } from "../../routes/browserRouter.route";
import { ERouteObject } from "../../interfaces/router.interface";

type Props = ButtonProps;

export function LogoutComponent({ onClick }: Props) {
  const navigate = useNavigate();
  const { signout } = authProvider;
  const [isLoggingOut, setisLoggingOut] = useState(false);
  async function handleOnclick(e: any) {
    setisLoggingOut(true);
    await signout();
    navigate(`${infosRouteDefault[ERouteObject.root].path}`);
    setisLoggingOut(false);
    onClick && onClick(e);
  }

  return (
    <Button
      loading={isLoggingOut}
      onClick={handleOnclick}
      className="logout-component"
    >
      {isLoggingOut ? "" : "Sair"}
    </Button>
  );
}
