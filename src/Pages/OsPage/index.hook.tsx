import { useEffect, useState } from "react";
import { getAllOs } from "../../services/os.service";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { getAllMecanicos } from "../../services/mecanicos.service";
import { getAllClientes } from "../../services/clientes.service";

export function useOsPage() {
  const [ordensServico, setordensServico] = useState<IOrdemServico[]>([]);
  const [autoComplete, setautoComplete] = useState<{
    mecanicosAutoComplete: { value: string }[];
    clientesAutoComplete: { value: string }[];
  }>({ mecanicosAutoComplete: [], clientesAutoComplete: [] });

  const [visible, setvisible] = useState(false);

  async function handleGetAll() {
    const ordens = await getAllOs();
    setordensServico(ordens);

    const mecanicos = await getAllMecanicos();
    const clientes = await getAllClientes();
    setautoComplete({
      clientesAutoComplete: clientes.map((cl) => ({ value: cl.nome })),
      mecanicosAutoComplete: mecanicos.map((mec) => ({ value: mec.nome })),
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
