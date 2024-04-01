import React from "react";
import { Button, Form, type FormProps, Input } from "antd";
import { User } from "../interfaces/login.interface";
import { login } from "../services/login.service";

const onFinish: FormProps<User>["onFinish"] = async (values) => {
  const result = await login({ senha: values.senha, usuario: values.usuario });

  sessionStorage.setItem("@token", JSON.stringify(result));
  window.location.assign("/home");
};

const onFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginComponent: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
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
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default LoginComponent;
