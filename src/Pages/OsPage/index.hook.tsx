import { useEffect, useState } from "react";
import { getAllOs } from "../../services/os.service";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { getAllMecanicos } from "../../services/mecanicos.service";

export function useOsPage() {
  const [ordensServico, setordensServico] = useState<IOrdemServico[]>([]);
  const [mecanicosAutocomplete, setmecanicosAutocomplete] = useState<
    { value: string }[]
  >([]);
  const [visible, setvisible] = useState(false);

  async function handleGetAllOS() {
    const ordens = await getAllOs();

    setordensServico(ordens);
  }

  async function handleMecanicos() {
    const mecanicos = await getAllMecanicos();

    setmecanicosAutocomplete(mecanicos.map((mec) => ({ value: mec.nome })));
  }

  useEffect(() => {
    handleGetAllOS();
    handleMecanicos();
  }, []);

  return {
    ordensServico,
    visible,
    setvisible,
    mecanicos: mecanicosAutocomplete,
  };
}
