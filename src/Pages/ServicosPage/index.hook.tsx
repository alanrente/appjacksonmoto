import { useEffect, useState } from "react";
import { getAllServicos } from "../../services/servicos.service";
import { Servico } from "../../interfaces/servico.interface";

export function useServicosPage() {
  const [servicos, setservicos] = useState<Servico[]>([]);

  async function handleGetServicos() {
    const listServicos = await getAllServicos();

    setservicos(listServicos);
  }

  useEffect(() => {
    handleGetServicos();
  }, []);
  return { servicos };
}
