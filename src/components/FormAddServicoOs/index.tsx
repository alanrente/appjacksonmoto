import "./style.css";
import { AutoComplete, Button, Form, Input } from "antd";
import { useFormAddServicoOs } from "./hook";

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

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
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={{ servicos: [{}] }}
    >
      <Form.List name="servicos">
        {(fields, { add, remove }) =>
          fields.map((field, index) => (
            <div className="form-os-conteudo" key={index}>
              <Form.Item
                name={[field.name, "servico"]}
                rules={[
                  { message: "Digite o nome do serviço", required: true },
                ]}
              >
                <AutoComplete
                  prefixCls="form-os-autocomplete"
                  placeholder="Serviço"
                  options={servicosAutocomplete}
                  onSelect={handleSelectAutocomplete}
                  filterOption={handleFilterOptions}
                />
              </Form.Item>
              <Form.Item
                name={[field.name, "valor"]}
                required
                rules={[
                  {
                    message: "Digite o valor do serviço",
                    required: true,
                  },
                ]}
              >
                <Input
                  prefixCls="form-os-input"
                  onChange={handleChangeInput}
                  placeholder="Valor"
                />
              </Form.Item>
              {index > 0 && <CloseOutlined onClick={() => remove(index)} />}
              <PlusOutlined onClick={() => add()} />
            </div>
          ))
        }
      </Form.List>
      <Button htmlType="submit" type="primary">
        Adicionar
      </Button>
    </Form>
  );
}
