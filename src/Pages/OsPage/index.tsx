import { useOsPage } from "./index.hook";
import { CardOSComponent } from "../../components/CardOSComponent/index.component";
import { ScrollContainerWithButton } from "../../components/ScrollContainerWithButton";
import { Fragment } from "react/jsx-runtime";
import { AutoComplete, Button, Form, FormInstance, Input, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ICliente, IMecanico } from "../../interfaces/servico.interface";

interface ValuesAutocomplete {
  mecanicos: IMecanico[];
  clientes: ICliente[];
}
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
  valuesAutocomplete?: ValuesAutocomplete;
}

const CreateFormOs: FC<CollectionForm> = ({
  initialValues,
  onFormInstanceReady,
  onFinish,
  onCancel,
  valuesAutocomplete,
}) => {
  const [placa, setplaca] = useState("");
  const [contato, setcontato] = useState("");
  const [form] = useForm();

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  useEffect(() => {
    console.log(placa);
    console.log(contato);
  }, [placa, contato]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      size="middle"
    >
      <Form.Item label="Mecanico" name={"mecanico"}>
        <AutoComplete
          options={valuesAutocomplete!.mecanicos.map((mec) => ({
            value: mec.nome,
          }))}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item label="Cliente" name={"cliente"}>
        <AutoComplete
          options={valuesAutocomplete!.clientes.map((cl) => ({
            value: cl.nome,
          }))}
          onSelect={(e) => {
            const clienteSelected = valuesAutocomplete!.clientes.find(
              (cl) => (cl.nome = e)
            );

            if (!clienteSelected) return;

            setcontato(clienteSelected.contato);
            setplaca(clienteSelected.placa);
          }}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item label="Placa" name={"placa"}>
        <Input value={placa} />
      </Form.Item>
      <Form.Item label="Contato" name={"contato"}>
        <Input value={contato} />
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
  const { ordensServico, setvisible, visible, autoComplete } = useOsPage();

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
          valuesAutocomplete={autoComplete}
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
