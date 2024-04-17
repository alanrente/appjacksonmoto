import { useEffect, useState } from "react";
import { getAllOs } from "../../services/os.service";
import { IOrdemServico } from "../../interfaces/servico.interface";

export function useOsPage() {
  const [ordensServico, setordensServico] = useState<IOrdemServico[]>([]);

  async function handleGetAllOS() {
    const ordens = await getAllOs();

    setordensServico(ordens);
  }

  useEffect(() => {
    handleGetAllOS();
  }, []);

  return {
    ordensServico,
  };
}
