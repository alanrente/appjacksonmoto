import { useEffect, useState } from "react";
import { getAllOs } from "../../services/os.service";

export function useOsPage() {
  const [ordensServico, setordensServico] = useState<any[]>([]);
  const [excludeColumn] = useState([
    "createdAt",
    "updatedAt",
    "mecanicoId",
    "clienteId",
  ]);

  function handleGetValor(servicos: any) {
    if (servicos.length === 1) return Number(servicos[0].valor).toFixed(2);
    return servicos.reduce((a: any, b: any) =>
      (Number(a.valor) + Number(b.valor)).toFixed(2)
    );
  }

  async function handleGetAllOS() {
    const ordens = await getAllOs();

    setordensServico(ordens);
  }

  useEffect(() => {
    handleGetAllOS();
  }, []);

  return { ordensServico, excludeColumn, handleGetValor };
}
