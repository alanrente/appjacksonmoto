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
import { useMessageAntd } from "../../hooks/useMessageAntd";
import { Alert } from "antd";

export function useOsPage() {
  const [visible, setvisible] = useState(false);

  const queryClient = useQueryClient();

  const { data: ordens } = useQuery({
    queryKey: ["ordens-servico"],
    queryFn: async () => {
      const ordens: IOrdemServico[] = await getAllOs({});
      return ordens;
    },
  });

  const mutationOrdens = useMutation({
    mutationFn: (e: TClienteCreate & TMecanicoCreate) => {
      const { mecanico, ...cliente } = e;
      return createOS({
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

  useEffect(() => {
    handleGetAll();
  }, []);

  return {
    ordens,
    visible,
    autoComplete,
    mutationOrdens,
    setvisible,
  };
}
