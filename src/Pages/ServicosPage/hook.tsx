import { useEffect, useState } from "react";
import { getAllServicos } from "../../services/servicos.service";
import { IServico } from "../../interfaces/servico.interface";

export function useServicosPage() {
  const [servicos, setservicos] = useState<IServico[]>([]);

  async function handleGetServicos() {
    const listServicos = await getAllServicos();

    setservicos(listServicos);
  }

  useEffect(() => {
    handleGetServicos();
  }, []);
  return { servicos };
}
