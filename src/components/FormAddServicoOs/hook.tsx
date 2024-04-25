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
  const [initialValuesFormList, setInitialValuesFormList] =
    useState<IServicoInitialValues>({ servicos: [{ servico: "", valor: 0 }] });
  const [servicosAutocomplete, setServicosAutocomplete] =
    useState<{ label: any; value: any }[]>();

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
      onCloseModal && onCloseModal();
      queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
    },
  });

  function addOrRemoveValuesServico({
    addOrRemove,
    index,
    value,
  }: {
    value: { servico: string; valor: number };
    index: number;
    addOrRemove: "add" | "remove";
  }) {
    let valuesServicos: IServicoSV[] = initialValuesFormList.servicos;
    const { servico, valor } = value;
    const objAddOrRemove = {
      add() {
        valuesServicos =
          index === 0
            ? [{ servico, valor }]
            : [...initialValuesFormList.servicos, { servico, valor }];
      },
      remove() {
        valuesServicos.splice(index, 1);
      },
    };

    objAddOrRemove[addOrRemove]();

    setInitialValuesFormList({ servicos: valuesServicos });
    form.setFieldsValue({
      servicos: valuesServicos,
    });
    return valuesServicos;
  }

  function handleSelectAutocomplete(value: any, index: number) {
    const objOfValue = JSON.parse(value) as any[];
    const [servico, valor] = objOfValue;

    addOrRemoveValuesServico({
      addOrRemove: "add",
      index,
      value: { servico, valor },
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
    servicosAutocomplete,
    initialValuesFormList,
    mutateFinish,
    handleSelectAutocomplete,
    addOrRemoveValuesServico,
    handleFilterOptions,
  };
}
