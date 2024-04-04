import { useState } from "react";
import { Button, Form, type FormProps, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../interfaces/login.interface";
import "./style.css";
import { authProvider } from "../../contexts/auth.context";

function LoginComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [load, setload] = useState(false);

  const onFinish: FormProps<User>["onFinish"] = async (values: User) => {
    setload(true);
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/home";

    try {
      await authProvider.signin(values);
      navigate(from);
    } catch (error) {
      return {
        error: "Invalid login attempt",
      };
    } finally {
      setload(false);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
      className="main"
    >
      <Form.Item<User>
        label="Usuário"
        className="form-item"
        name="usuario"
        rules={[{ required: true, message: "Insira um Usuário!" }]}
      >
        <Input className="input-main" />
      </Form.Item>

      <Form.Item<User>
        label="Senha"
        className="form-item"
        name="senha"
        rules={[{ required: true, message: "Insira uma senha!" }]}
      >
        <Input.Password className="input-main" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="form-item">
        <Button type="primary" htmlType="submit" loading={load}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginComponent;
