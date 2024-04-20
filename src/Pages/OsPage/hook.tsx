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

export function useOsPage() {
  const [ordensServico, setordensServico] = useState<IOrdemServico[]>([]);
  const [visible, setvisible] = useState(false);
  const [autoComplete, setautoComplete] = useState<{
    mecanicos: TMecanico[];
    clientes: TCliente[];
  }>({ mecanicos: [], clientes: [] });

  async function handleGetAll() {
    const ordens = await getAllOs({});
    setordensServico(ordens);

    const mecanicos = await getAllMecanicos();
    const clientes = await getAllClientes();
    setautoComplete({
      clientes,
      mecanicos,
    });
  }

  function handleCreateOs(e: TClienteCreate & TMecanicoCreate) {
    const { mecanico, ...cliente } = e;
    createOS({
      cliente,
      mecanico,
      servicos: [],
    });
  }

  useEffect(() => {
    handleGetAll();
  }, []);

  return {
    ordensServico,
    visible,
    setvisible,
    autoComplete,
    handleCreateOs,
  };
}
