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

  // const [visible, setvisible] = useState(false);
  // return (
  //   <div className="ordens" key={"OsPage"}>
  //     <table>
  //       <thead>
  //         {ordensServico && (
  //           <tr>
  //             <th>OS</th>
  //             <th>Data</th>
  //             <th>mecanico</th>
  //             <th>cliente</th>
  //             <th>servicos</th>
  //             <th>valor</th>
  //           </tr>
  //         )}
  //       </thead>
  //       <tbody>
  //         {ordensServico &&
  //           ordensServico.map((ordemS, i) => {
  //             return (
  //               <>
  //                 <tr
  //                   onClick={() => {
  //                     setvisible(!visible);
  //                   }}
  //                   key={i}
  //                   className="ordens-item"
  //                 >
  //                   <td>{ordemS.idOrdemServico}</td>
  //                   <td>{ordemS.dataExecucao}</td>
  //                   <td>{ordemS.mecanico.nome}</td>
  //                   <td>{ordemS.cliente.nome}</td>
  //                   <td>{ordemS.servicos.length}</td>
  //                   <td>{handleGetValor(ordemS.servicos)}</td>
  //                 </tr>
  //               </>
  //             );
  //           })}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  const newColumns: TableColumnsType<any> = ordemColumns
    .filter((col) => !excludeColumn.includes(col))
    .map((ordem) => ({
      title: ordem,
      dataIndex: ordem,
      key: ordem,
    }));

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
    idOrdemServico: os.idOrdemServico,
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
      />
    </>
  );
}
