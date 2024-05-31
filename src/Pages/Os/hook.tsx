import { useEffect, useState } from "react";
import { createOS, getOpenOnly } from "../../services/os.service";
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

export function useOsPage() {
  const queryClient = useQueryClient();

  const [autoComplete, setautoComplete] = useState<{
    mecanicos: TMecanico[];
    clientes: TCliente[];
  }>({ mecanicos: [], clientes: [] });
  const [visible, setvisible] = useState(false);
  const [visibleSkeleton, setvisibleSkeleton] = useState(false);

  const [forminstance, setforminstance] = useState<FormInstance>();

  function handleOk(e: TMecanicoCreate & TClienteCreate) {
    forminstance?.resetFields();
    mutationOrdens.mutate(e);
  }

  const { data: ordens } = useQuery({
    queryKey: ["ordens-servico"],
    queryFn: async () => {
      const { ordensServicos }: { ordensServicos: IOrdemServico[] } =
        await getOpenOnly();
      setvisibleSkeleton(false);
      return ordensServicos;
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
    ordens,
    visible,
    autoComplete,
    visibleSkeleton,
    handleOk,
    setvisible,
    setforminstance,
    setvisibleSkeleton,
    retornaArrayElement,
  };
}
