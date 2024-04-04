import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { authProvider } from "../../contexts/auth.context";

export function LogoutComponent() {
  const navigate = useNavigate();
  const { signout } = authProvider;
  const [isLoggingOut, setisLoggingOut] = useState(false);
  async function onclick() {
    setisLoggingOut(true);
    await signout();
    navigate("/");
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
