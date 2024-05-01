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
import { Alert } from "antd";
import moment from "moment-timezone";
import { CardOSComponent } from "../../components/CardOS";

export function useOsPage() {
  const [visible, setvisible] = useState(false);
  const [visibleSkeleton, setvisibleSkeleton] = useState(false);
  const [dtInicioDtFim, setdtInicioDtFim] = useState({
    dtInicio: moment().format("YYYY-MM-DD"),
    dtFim: moment().format("YYYY-MM-DD"),
  });

  const queryClient = useQueryClient();

  const { data: ordens } = useQuery({
    queryKey: ["ordens-servico"],
    queryFn: async () => {
      const ordens: IOrdemServico[] = await getAllOs({
        dtInicio: dtInicioDtFim.dtInicio,
        dtFim: dtInicioDtFim.dtFim,
      });
      setvisibleSkeleton(false);
      return ordens;
    },
  });

  const mutationGetFiltered = useMutation({
    mutationFn: async () => {
      return await getAllOs({
        dtInicio: dtInicioDtFim.dtInicio,
        dtFim: dtInicioDtFim.dtFim,
      });
    },
    onError: (err) => {
      Alert({ type: "error", message: err.message });
      setvisibleSkeleton(false);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
    },
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
  }, []);

  return {
    visible,
    autoComplete,
    mutationOrdens,
    visibleSkeleton,
    mutationGetFiltered,
    setvisible,
    setdtInicioDtFim,
    setvisibleSkeleton,
    retornaArrayElement,
  };
}
