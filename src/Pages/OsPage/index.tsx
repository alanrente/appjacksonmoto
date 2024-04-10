import "./style.css";
import { useOsPage } from "./index.hook";
import { useState } from "react";

export function OsPage() {
  const { ordensServico, excludeColumn, handleGetValor } = useOsPage();
  const [visible, setvisible] = useState(false);

  return (
    <div className="ordens" key={"OsPage"}>
      <table>
        <thead>
          {ordensServico && (
            <tr>
              <th>OS</th>
              <th>Data</th>
              <th>mecanico</th>
              <th>cliente</th>
              <th>servicos</th>
              <th>valor</th>
            </tr>
          )}
        </thead>
        <tbody>
          {ordensServico &&
            ordensServico.map((ordemS, i) => {
              return (
                <>
                  <tr
                    onClick={() => {
                      setvisible(!visible);
                    }}
                    key={i}
                    className="ordens-item"
                  >
                    <td>{ordemS.idOrdemServico}</td>
                    <td>{ordemS.dataExecucao}</td>
                    <td>{ordemS.mecanico.nome}</td>
                    <td>{ordemS.cliente.nome}</td>
                    <td>{ordemS.servicos.length}</td>
                    <td>{handleGetValor(ordemS.servicos)}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
