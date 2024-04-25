import "./style.css";
import { AutoComplete, Button, Form, Input } from "antd";
import { useFormAddServicoOs } from "./hook";

import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

export function FormAddServicoOs({
  idOrdemServico,
  onCloseModal,
}: {
  idOrdemServico: number;
  onCloseModal?: () => any | void;
}) {
  const {
    form,
    mutateFinish,
    servicosAutocomplete,
    initialValuesFormList,
    handleChangeValor,
    handleFilterOptions,
    handleInputAutoComplete,
    handleSelectAutocomplete,
    addOrRemoveValuesServico,
  } = useFormAddServicoOs(idOrdemServico, onCloseModal);

  return (
    <Form
      form={form}
      onFinish={async (e) => {
        mutateFinish.mutate(e);
      }}
      initialValues={initialValuesFormList}
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
                  onChange={(e) => handleInputAutoComplete(e, field.name)}
                  options={servicosAutocomplete}
                  onSelect={(e) => handleSelectAutocomplete(e, field.name)}
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
                  onChange={(e) => handleChangeValor(e, field.name)}
                  prefixCls="form-os-input"
                  placeholder="Valor"
                  type="number"
                />
              </Form.Item>
              <PlusOutlined onClick={() => add()} />
              {index > 0 && (
                <CloseOutlined
                  onClick={() => {
                    remove(index);
                    addOrRemoveValuesServico({
                      addOrRemove: "remove",
                      index,
                      value: { servico: "", valor: 0 },
                    });
                  }}
                />
              )}
            </div>
          ))
        }
      </Form.List>
      <Button htmlType="submit" type="primary">
        Salvar
      </Button>
    </Form>
  );
}
