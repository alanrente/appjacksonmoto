import { useForm } from "antd/es/form/Form";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ServicosAddOs } from "../../interfaces/servico.interface";
import { getAllServicos } from "../../services/servicos.service";
import { DefaultOptionType } from "antd/es/select";

export function useFormAddServicoOs(idOrdemServico: number) {
  const [form] = useForm<ServicosAddOs>();
  const [servicosAutocomplete, setServicosAutocomplete] =
    useState<{ label: any; value: any }[]>();

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

  async function handleFinish(values: ServicosAddOs) {
    values.idOrdemServico = idOrdemServico;
    console.log(values);
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      form.setFieldValue("valor", "");
      return;
    }
  }

  function handleSelectAutocomplete(value: any, label?: any) {
    const objOfValue = JSON.parse(value) as any[];
    objOfValue.push(idOrdemServico);
    console.log(objOfValue);
    form.setFieldValue("servico", objOfValue[0]);
    form.setFieldValue("valor", objOfValue[1]);
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
    handleSelectAutocomplete,
    handleFilterOptions,
    handleFinish,
    handleChangeInput,
  };
}
