import { useEffect, useState } from "react";
import {
  IOrdemServico,
  IRelatorio,
  TCliente,
  TMecanico,
} from "../../interfaces/servico.interface";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { closeOrReopen, getAllOs } from "../../services/os.service";
import moment from "moment-timezone";
import { DATA, tagIdOrdemServico } from "../../utils/constants.util";
import { Alert, message } from "antd";
import { format } from "date-fns";

export function useRelatorio() {
  const queryClient = useQueryClient();

  const [filterClienteEMecanico, setFilterClienteEMecanico] = useState<{
    mecanicoId?: number;
    clienteId?: number;
  }>();
  const [optionsMecanicos, setOptionsMecanicos] =
    useState<{ value: string; label: string }[]>();
  const [optionsClientes, setOptionsClientes] =
    useState<{ value: string; label: string }[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ordem, setOrdem] = useState<IOrdemServico>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(moment().subtract(10, "days").format()),
    to: new Date(moment().format()),
  });

  const mutReabrirOs = useMutation({
    async mutationFn(idOrdemServico: number) {
      setIsLoading(true);
      await closeOrReopen({ id: idOrdemServico, openOrReopen: "reabrir" });
    },
    onError(err) {
      setIsLoading(false);
      setVisible(false);
      message.error(err.message);
    },
    async onSuccess(data, variables) {
      await queryClient.invalidateQueries({ queryKey: ["ordens-relatorio"] });
      setIsLoading(false);
      setVisible(false);
      message.success(`OS: ${tagIdOrdemServico(variables)} reaberta!`);
    },
    gcTime: 0,
  });

  function setLoadSetVisibleAndCallMutationFilter() {
    setIsLoading(true);
    setVisible(false);
    mutationFilter.mutate();
  }

  function onSelectDayPicker(e: any) {
    setRange(e);

    if (e && e.from && e.to) {
      setLoadSetVisibleAndCallMutationFilter();
    }
  }

  function handleClickInput() {
    setRange({ from: undefined, to: undefined });
    setShowDatePicker(true);
    setVisible(true);
  }

  function getQueryString() {
    return {
      dtInicio: format(range!.from!, DATA.US_dateFns),
      dtFim: format(range!.to!, DATA.US_dateFns),
      includeTotais: true,
      clienteId:
        filterClienteEMecanico?.clienteId === 0 ||
        !filterClienteEMecanico?.clienteId
          ? undefined
          : filterClienteEMecanico?.clienteId,
      mecanicoId:
        filterClienteEMecanico?.mecanicoId === 0 ||
        !filterClienteEMecanico?.mecanicoId
          ? undefined
          : filterClienteEMecanico?.mecanicoId,
    };
  }

  const { data: ordens } = useQuery({
    queryKey: ["ordens-relatorio"],
    queryFn: async () => {
      console.log("defaultMutation");
      const ordens: IRelatorio = await getAllOs(getQueryString());
      return ordens;
    },
    gcTime: 0,
  });

  const mutationFilter = useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ordens-relatorio"] });
    },
    onError: (err) => {
      Alert({ type: "error", message: err.message });
    },
    onSuccess() {
      setShowDatePicker(false);
      setIsLoading(false);
    },
    gcTime: 0,
  });

  function calcValores(listaValores: number[]) {
    if (listaValores.length === 0) return 0;
    if (listaValores.length === 1) return listaValores[0];

    return listaValores.reduce((a, b) => Number(a) + Number(b));
  }

  function handleClick(ordem: IOrdemServico) {
    setOrdem(ordem);
    setVisible(true);
  }

  function onSelectCliente(e: any, data: "clienteId" | "mecanicoId") {
    const filterCEM = { ...filterClienteEMecanico, [data]: Number(e) };
    setFilterClienteEMecanico(filterCEM);
    setLoadSetVisibleAndCallMutationFilter();
  }

  useEffect(() => {
    if (!ordens) return;
    const newSetOfMecanicos = new Set<string>();
    const newSetOfClientes = new Set<string>();

    ordens.ordensServicos.forEach((os) => {
      newSetOfClientes.add(`${JSON.stringify(os.cliente)}`);
      newSetOfMecanicos.add(`${JSON.stringify(os.mecanico)}`);
    });

    const lista = {
      mecanicos: Array.from(newSetOfMecanicos).map((strJsonMec) => ({
        label: (JSON.parse(strJsonMec) as TMecanico).nome.toString(),
        value: (JSON.parse(strJsonMec) as TMecanico).idMecanico.toString(),
      })),
      clientes: Array.from(newSetOfClientes).map((strJsonClient) => ({
        label: (JSON.parse(strJsonClient) as TCliente).nome.toString(),
        value: (JSON.parse(strJsonClient) as TCliente).idCliente.toString(),
      })),
    };

    const optionTodos: { label: string; value: string } = {
      label: "Todos",
      value: "0",
    };

    setOptionsClientes([optionTodos, ...lista.clientes]);
    setOptionsMecanicos([optionTodos, ...lista.mecanicos]);
  }, [ordens]);

  return {
    ordem,
    range,
    ordens,
    visible,
    isLoading,
    mutReabrirOs,
    showDatePicker,
    optionsClientes,
    optionsMecanicos,
    setVisible,
    calcValores,
    handleClick,
    setIsLoading,
    onSelectCliente,
    handleClickInput,
    onSelectDayPicker,
  };
}
