import { useEffect, useState } from "react";
import { createOS, getAllOs } from "../../services/os.service";
import {
  TCliente,
  TMecanico,
  IOrdemServico,
  TClienteCreate,
  TMecanicoCreate,
} from "../../interfaces/servico.interface";
import { getAllMecanicos } from "../../services/mecanicos.service";
import { getAllClientes } from "../../services/clientes.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, FormInstance } from "antd";
import { CardOSComponent } from "../../components/CardOS";
import { DateRange } from "react-day-picker";
import { addDays, format, subDays } from "date-fns";

type PropsUseOsPage = {
  defaulDateRange?: DateRange;
  relatorio?: boolean;
};

export function useOsPage({
  defaulDateRange = {
    from: subDays(new Date(), 7),
    to: addDays(new Date(), 0),
  },
  relatorio = false,
}: PropsUseOsPage) {
  const [visible, setvisible] = useState(false);
  const [visibleSkeleton, setvisibleSkeleton] = useState(false);

  const [dtInicioDtFim, setdtInicioDtFim] = useState({
    dtInicio:
      defaulDateRange.from && format(defaulDateRange.from, "yyyy-MM-dd"),
    dtFim: defaulDateRange.to && format(defaulDateRange.to, "yyyy-MM-dd"),
  });
  const [range, setRange] = useState<DateRange | undefined>(defaulDateRange);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [forminstance, setforminstance] = useState<FormInstance>();

  function handleClickInput() {
    setShowDatePicker(true);
    setvisible(true);
    setRange({ from: undefined, to: undefined });
  }

  function handleOk(e: TMecanicoCreate & TClienteCreate) {
    forminstance?.resetFields();
    mutationOrdens.mutate(e);
  }

  const queryClient = useQueryClient();

  const { data: ordens } = useQuery({
    queryKey: ["ordens-servico"],
    queryFn: async () => {
      const ordens: IOrdemServico[] = await getAllOs({
        dtInicio: dtInicioDtFim.dtInicio,
        dtFim: dtInicioDtFim.dtFim,
        includeTotais: relatorio,
      });
      setvisibleSkeleton(false);
      return ordens;
    },
    gcTime: 0,
  });

  const mutationGetFiltered = useMutation({
    mutationFn: async () => {
      return await getAllOs({
        dtInicio: dtInicioDtFim.dtInicio,
        dtFim: dtInicioDtFim.dtFim,
        includeTotais: relatorio,
      });
    },
    onError: (err) => {
      Alert({ type: "error", message: err.message });
      setvisibleSkeleton(false);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
    },
    gcTime: 0,
  });

  const mutationOrdens = useMutation({
    mutationFn: async (e: TClienteCreate & TMecanicoCreate) => {
      const { mecanico, ...cliente } = e;
      return await createOS({
        cliente,
        mecanico,
        servicos: [],
      });
    },
    onError: (err) => {
      setvisible(false);
      Alert({ type: "error", message: err.message });
    },
    onSuccess() {
      setvisible(false);
      queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
    },
    gcTime: 0,
  });

  const [autoComplete, setautoComplete] = useState<{
    mecanicos: TMecanico[];
    clientes: TCliente[];
  }>({ mecanicos: [], clientes: [] });

  async function handleGetAll() {
    const mecanicos = await getAllMecanicos();
    const clientes = await getAllClientes();
    setautoComplete({
      clientes,
      mecanicos,
    });
  }

  function retornaArrayElement() {
    // if (!ordens) return [<Skeleton active key={"skeleton-os-page"} />];
    if (ordens && ordens.length > 0)
      return ordens.map((os, i) => (
        <CardOSComponent os={os} key={i.toString()} />
      ));

    return [<>Não ha ordens cadastradas!</>];
  }

  useEffect(() => {
    handleGetAll();
    setvisibleSkeleton(true);
  }, []);

  return {
    range,
    ordens,
    visible,
    autoComplete,
    showDatePicker,
    visibleSkeleton,
    mutationGetFiltered,
    handleOk,
    setRange,
    setvisible,
    setforminstance,
    handleClickInput,
    setdtInicioDtFim,
    setShowDatePicker,
    setvisibleSkeleton,
    retornaArrayElement,
  };
}
