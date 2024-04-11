import { useEffect, useState } from "react";
import { getAllOs } from "../../services/os.service";
import { Servico } from "../../interfaces/servico.interface";
import { Table, TableColumnsType } from "antd";
import { ColumnsType } from "antd/es/table";

export function useOsPage() {
  const [ordensServico, setordensServico] = useState<any[]>([]);
  const [ordemColumns, setordemColumns] = useState<any[]>([]);
  const [excludeColumn] = useState([
    "createdAt",
    "updatedAt",
    "mecanicoId",
    "clienteId",
    "osServico",
  ]);

  function handleGetValor(servicos: any) {
    if (servicos.length === 1) return Number(servicos[0].valor).toFixed(2);
    return servicos.reduce((a: any, b: any) =>
      (Number(a.valor) + Number(b.valor)).toFixed(2)
    );
  }

  function expandedRender(args: any) {
    const ordemExpanded = ordensServico[args.key].servicos as Servico[];
    const keysFirstItemServico = Object.keys(ordemExpanded[0]);
    const columnstableServicos: ColumnsType<Servico> = keysFirstItemServico
      .filter((key) => !excludeColumn.includes(key))
      .map((key) => {
        return { key, title: key, dataIndex: key };
      });

    return (
      <Table
        columns={columnstableServicos}
        dataSource={ordemExpanded}
        pagination={false}
      />
    );
  }

  async function handleGetAllOS() {
    const ordens = await getAllOs();

    setordensServico(ordens);
    setordemColumns(Object.keys(ordens[0]));
  }

  useEffect(() => {
    handleGetAllOS();
  }, []);

  return {
    ordensServico,
    excludeColumn,
    handleGetValor,
    ordemColumns,
    expandedRender,
  };
}
