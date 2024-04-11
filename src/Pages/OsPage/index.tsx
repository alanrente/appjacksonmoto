import "./style.css";
import { useOsPage } from "./index.hook";
import type { TableColumnsType } from "antd";
import { Space, Table } from "antd";
import moment from "../../instances/moment.instance";

export function OsPage() {
  const {
    ordensServico,
    excludeColumn,
    handleGetValor,
    ordemColumns,
    expandedRender,
  } = useOsPage();

  const newColumns: TableColumnsType<any> = ordemColumns
    .filter((col) => !excludeColumn.includes(col))
    .map((ordem) => {
      const colum = ordem.includes("id") ? "os" : ordem;
      return {
        title: colum,
        dataIndex: colum,
        key: colum,
      };
    });

  newColumns.length > 0 &&
    newColumns.push({ title: "valor", key: "valor", dataIndex: "valor" }) &&
    newColumns.push({
      title: "",
      key: "operation",
      render: () => (
        <Space>
          <a>Pause</a>
          <a>Stop</a>
        </Space>
      ),
    });

  const newData = ordensServico.map((os, i) => ({
    key: i.toString(),
    os: os.idOrdemServico,
    dataExecucao: moment(os.dataExecucao).format("DD/MM/YYYY"),
    mecanico: os.mecanico.nome,
    cliente: os.cliente.nome,
    servicos: os.servicos.length,
    valor: handleGetValor(os.servicos),
  }));

  return (
    <>
      <Table
        pagination={false}
        className="ordens"
        columns={newColumns}
        expandable={{
          expandedRowRender: expandedRender,
        }}
        dataSource={newData}
        // scroll={{ y: 800 }}
      />
    </>
  );
}
