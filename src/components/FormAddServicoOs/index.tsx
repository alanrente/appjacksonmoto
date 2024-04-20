import { AutoComplete, Button, Form, Input } from "antd";
import { useFormAddServicoOs } from "./hook";
import { IServico } from "../../interfaces/servico.interface";

export function FormAddServicoOs({
  idOrdemServico,
}: {
  idOrdemServico: number;
}) {
  const {
    form,
    servicosAutocomplete,
    handleSelectAutocomplete,
    handleFilterOptions,
    handleFinish,
    handleChangeInput,
  } = useFormAddServicoOs(idOrdemServico);
  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item<IServico>
        // label="Servico"
        name={"servico"}
        rules={[{ message: "Digite o nome do serviço", required: true }]}
      >
        <AutoComplete
          placeholder="Serviço"
          options={servicosAutocomplete}
          onSelect={handleSelectAutocomplete}
          filterOption={handleFilterOptions}
        />
      </Form.Item>
      <Form.Item<IServico>
        // label="Valor"
        name="valor"
        required
        rules={[
          {
            message: "Digite o valor do serviço",
            required: true,
          },
        ]}
      >
        <Input onChange={handleChangeInput} placeholder="Valor" />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Salvar
      </Button>
    </Form>
  );
}
