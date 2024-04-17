import { useOsPage } from "./index.hook";
import { CardOSComponent } from "../../components/CardOSComponent/index.component";
import { ScrollContainerWithButton } from "../../components/ScrollContainerWithButton";
import { Fragment } from "react/jsx-runtime";
import { AutoComplete, Button, Form, FormInstance, Input, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

interface Values {
  mecanico: string;
  cliente: string;
  placa: string;
  contato: string | null;
}
interface CollectionForm {
  initialValues: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
  onFinish: (e: any) => void;
  onCancel: (e: any) => void;
  valuesAutocomplete?: { value: string }[];
}

const CreateFormOs: FC<CollectionForm> = ({
  initialValues,
  onFormInstanceReady,
  onFinish,
  onCancel,
  valuesAutocomplete,
}) => {
  const [form] = useForm();

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      size="middle"
    >
      <Form.Item label="Mecanico" name={"mecanico"}>
        <AutoComplete
          options={valuesAutocomplete}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item label="Cliente" name={"cliente"}>
        <Input />
      </Form.Item>
      <Form.Item label="Placa" name={"placa"}>
        <Input />
      </Form.Item>
      <Form.Item label="Contato" name={"contato"}>
        <Input />
      </Form.Item>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
        <Button onClick={onCancel} type="text">
          Cancelar
        </Button>
      </div>
    </Form>
  );
};
export function OsPage() {
  const { ordensServico, setvisible, visible, mecanicos } = useOsPage();

  const [forminstance, setforminstance] = useState<FormInstance>();

  function handleOk(e: any) {
    forminstance?.resetFields();
    console.log(e);
    setvisible(false);
  }

  return (
    <>
      <ScrollContainerWithButton
        onClick={() => setvisible(true)}
        children={
          ordensServico.length > 0
            ? ordensServico.map((os, i) => (
                <CardOSComponent os={os} key={i.toString()} />
              ))
            : [<Fragment key={"empty"}></Fragment>]
        }
      />
      <Modal
        open={visible}
        closeIcon={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <CreateFormOs
          onFinish={handleOk}
          valuesAutocomplete={mecanicos}
          onCancel={() => setvisible(false)}
          initialValues={{
            cliente: "",
            mecanico: "",
            placa: "",
            contato: null,
          }}
          onFormInstanceReady={(instance) => {
            setforminstance(instance);
          }}
        />
      </Modal>
    </>
  );
}
