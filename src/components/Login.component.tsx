import { useState } from "react";
import { Button, Form, type FormProps, Input } from "antd";
import { User } from "../interfaces/login.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { fakeAuthProvider } from "../auth";

function LoginComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [load, setload] = useState(false);

  const onFinish: FormProps<User>["onFinish"] = async (values: User) => {
    setload(true);
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";

    try {
      await fakeAuthProvider.signin(values.usuario);
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
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<User>
        label="Usuário"
        name="usuario"
        rules={[{ required: true, message: "Insira um Usuário!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<User>
        label="Senha"
        name="senha"
        rules={[{ required: true, message: "Insira uma senha!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={load}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginComponent;
