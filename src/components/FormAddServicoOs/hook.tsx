import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import {
  IServicoInitialValues,
  IServicoSV,
  ServicosAddOs,
} from "../../interfaces/servico.interface";
import { getAllServicos } from "../../services/servicos.service";
import { DefaultOptionType } from "antd/es/select";
import { addServicosInOs } from "../../services/os.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "antd";

export function useFormAddServicoOs(
  idOrdemServico: number,
  onCloseModal?: (args?: any) => any | void
) {
  const [form] = useForm<ServicosAddOs>();
  const [initialValuesFormList] = useState<IServicoInitialValues>({
    servicos: [{ servico: "", valor: 0 }],
  });
  const [servicosAutocomplete, setServicosAutocomplete] =
    useState<{ label: any; value: any }[]>();
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  async function handleGetServicos() {
    const servicos = await getAllServicos();

    const toAutocomplete = servicos!.map((serv, i) => ({
      value: `["${serv.servico}","${serv.valor}"]`,
      label: (
        <React.Fragment key={serv.idServico.toString()}>
          <span style={{ textTransform: "capitalize", marginRight: "5px" }}>
            {serv.servico}
          </span>
          <span>{serv.valor}</span>
        </React.Fragment>
      ),
    }));

    setServicosAutocomplete(toAutocomplete);
  }

  const mutateFinish = useMutation({
    mutationFn: async (values: ServicosAddOs) => {
      values.idOrdemServico = idOrdemServico;
      await addServicosInOs(values);
      form.resetFields(["servicos"]);
    },
    onError: (err) => {
      Alert({ type: "error", message: err.message });
    },
    onSuccess: () => {
      setLoading(false);
      onCloseModal && onCloseModal();
      queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
    },
  });

  function changeOrRemoveValuesServico({
    addOrRemove,
    index,
    value,
  }: {
    value: { servico: string; valor?: number };
    index: number;
    addOrRemove: "change" | "remove";
  }) {
    const { servicos } = form.getFieldsValue();

    let valuesServicos: IServicoSV[] = servicos;
    const { servico, valor } = value;
    const objAddOrRemove = {
      change() {
        const novoValor = valor ? valor : servicos[index].valor,
          novoServico = servico ? servico : servicos[index].servico;

        valuesServicos[index] = { servico: novoServico, valor: novoValor };
      },
      remove() {
        valuesServicos.splice(index, 1);
      },
    };

    objAddOrRemove[addOrRemove]();

    form.setFieldsValue({
      servicos: valuesServicos,
    });
    return valuesServicos;
  }

  function handleSelectAutocomplete(value: any, index: number) {
    const objOfValue = JSON.parse(value) as any[];
    const [servico, valor] = objOfValue;

    changeOrRemoveValuesServico({
      addOrRemove: "change",
      index,
      value: { servico, valor },
    });
  }

  function handleChangeAutoComplete(value: any, index: number) {
    changeOrRemoveValuesServico({
      addOrRemove: "change",
      index,
      value: { servico: value },
    });
  }

  function handleChangeValor(value: any, index: number) {
    changeOrRemoveValuesServico({
      addOrRemove: "change",
      index,
      value: { servico: "", valor: value.target.value },
    });
  }

  function handleFilterOptions(
    inputValue: string,
    option: DefaultOptionType | undefined
  ): boolean {
    if (!option) return false;
    return (
      option.value
        ?.toString()!
        .toUpperCase()
        .indexOf(inputValue.toUpperCase()) !== -1
    );
  }

  useEffect(() => {
    handleGetServicos();
  }, []);

  return {
    form,
    mutateFinish,
    servicosAutocomplete,
    initialValuesFormList,
    loading,
    setLoading,
    handleChangeValor,
    handleFilterOptions,
    handleChangeAutoComplete,
    changeOrRemoveValuesServico,
    handleSelectAutocomplete,
  };
}
