import "./style.css";
import { useOSFormCollection } from "./hook";
import { CollectionForm } from "../../interfaces/forms.interface";
import { AutoComplete, Button, Form, Input } from "antd";

export function OSFormCollection({
  onCancel,
  onFinish,
  onFormInstanceReady,
  initialValues,
  valuesAutocomplete,
}: CollectionForm) {
  const { disableInfosCliente, form, setdisableInfosCliente } =
    useOSFormCollection();

  return (
    <>
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        // layout="vertical"
        prefixCls="form-os"
      >
        <div className="form-os__f-itens">
          <Form.Item
            className="form-os__container"
            label="Mecanico"
            name={"mecanico"}
            rules={[{ required: true }]}
          >
            <AutoComplete
              options={valuesAutocomplete!.mecanicos.map((mec) => ({
                value: mec.nome,
              }))}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.Item
            className="form-os__container"
            label="Cliente"
            name={"cliente"}
            rules={[{ required: true }]}
          >
            <AutoComplete
              options={valuesAutocomplete!.clientes.map((cl) => ({
                value: cl.nome,
              }))}
              onChange={(e) => {
                const includesCliente = valuesAutocomplete!.clientes
                  .map((cl) => cl.nome)
                  .includes(e);

                if (!includesCliente) {
                  form.setFieldValue("placa", "");
                  form.setFieldValue("contato", "");
                  setdisableInfosCliente(false);
                }
              }}
              onSelect={(e) => {
                const clienteSelected = valuesAutocomplete!.clientes.find(
                  (cl) => cl.nome === e
                );

                form.setFieldValue("placa", clienteSelected!.placa);
                form.setFieldValue("contato", clienteSelected!.contato);
                setdisableInfosCliente(true);
              }}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
          <Form.Item
            className="form-os__container"
            label="Placa"
            name={"placa"}
            children={
              <Input
                disabled={disableInfosCliente}
                onChange={(e) => {
                  form.setFieldValue("placa", e.target.value.toUpperCase());
                }}
              />
            }
          />
          <Form.Item
            className="form-os__container"
            label="Contato"
            name={"contato"}
            rules={[
              {
                message: "deve ser números e conter entre 9 e 11 caracteres",
                max: 11,
              },
            ]}
            children={
              <Input
                disabled={disableInfosCliente}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNaN(Number(value))) {
                    form.setFieldValue("contato", "");
                    return;
                  }
                }}
              />
            }
          />
        </div>
        <div className="form-os__buttons">
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
          <Button onClick={onCancel} type="text">
            Cancelar
          </Button>
        </div>
      </Form>
    </>
  );
}
