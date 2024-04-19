import { useEffect, useState } from "react";
import { getAllOs } from "../../services/os.service";
import {
  ICliente,
  IMecanico,
  IOrdemServico,
} from "../../interfaces/servico.interface";
import { getAllMecanicos } from "../../services/mecanicos.service";
import { getAllClientes } from "../../services/clientes.service";

export function useOsPage() {
  const [ordensServico, setordensServico] = useState<IOrdemServico[]>([]);
  const [autoComplete, setautoComplete] = useState<{
    mecanicos: IMecanico[];
    clientes: ICliente[];
  }>({ mecanicos: [], clientes: [] });

  const [visible, setvisible] = useState(false);

  async function handleGetAll() {
    const ordens = await getAllOs();
    setordensServico(ordens);

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
    ordensServico,
    visible,
    setvisible,
    autoComplete,
  };
}
