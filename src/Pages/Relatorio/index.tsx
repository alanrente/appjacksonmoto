import "./style.css";
import { ScrollContainerHorizontal } from "../../components/ScrollContainerHorizontal";
import { useOsPage } from "../OsPage/hook";
import { useRelatorio } from "./index.hook";
import { format, subDays } from "date-fns";
import { CalendarFilled } from "@ant-design/icons";
import { FiTool, FiUser } from "react-icons/fi";
import { GrMoney, GrUserWorker } from "react-icons/gr";
import { Modal, Skeleton } from "antd";
import { ScrollContainerVertical } from "../../components/ScrollContainerWithButton";

export function Relatorio() {
  const { ordens, visibleSkeleton } = useOsPage({
    defaulDateRange: { from: subDays(new Date(), 10), to: new Date() },
    relatorio: true,
  });
  const { visible, setVisible, calcValores, handleClick, ordem } =
    useRelatorio();

  return (
    <>
      <ScrollContainerHorizontal>
        <button>Primeiro</button>
        <button>Segundo</button>
        <button>Terceiro</button>
        <button>Quarto</button>
      </ScrollContainerHorizontal>
      <ScrollContainerVertical showButton={false}>
        {visibleSkeleton ? (
          <Skeleton active />
        ) : (
          <div className="div-main">
            {ordens &&
              ordens.map((ordem) => (
                <>
                  <div
                    key={ordem.idOrdemServico.toString()}
                    className="div-container"
                    onClick={() => handleClick(ordem)}
                  >
                    <div>
                      <CalendarFilled />
                      {format(new Date(`${ordem.dataExecucao} `), "dd/MM/yyyy")}
                    </div>

                    <div>
                      <FiUser />
                      <span>{ordem.cliente.nome}</span>
                    </div>
                    <div>
                      <GrUserWorker />
                      <span>{ordem.mecanico.nome}</span>
                    </div>
                    <div>
                      <FiTool />
                      {ordem.servicos.length > 9 ? "9+" : ordem.servicos.length}
                    </div>

                    {/* <div>
                  <GrMoney />
                  {calcValores(servicos.map((servico) => servico.valor))}
                </div> */}
                  </div>
                </>
              ))}
          </div>
        )}
      </ScrollContainerVertical>
      <Modal
        open={visible}
        title={ordem?.idOrdemServico.toString().padStart(6, "0")}
        closable
        destroyOnClose
        onCancel={() => setVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {ordem && (
          <>
            <div>
              <CalendarFilled />
              {format(new Date(`${ordem.dataExecucao} `), "dd/MM/yyyy")}
            </div>

            <div>
              <FiUser />
              <span>{ordem.cliente.nome} - </span>
              <span>{ordem.cliente.placa + " - " || ""}</span>
              <span>{ordem.cliente.contato || ""}</span>
            </div>
            <div>
              <GrUserWorker />
              <span>{ordem.mecanico.nome}</span>

              {ordem.totalMecanico && (
                <>
                  {" "}
                  <GrMoney />
                  <span>{ordem.totalMecanico}</span>
                </>
              )}
            </div>
            <div>
              {ordem.servicos.map((servico) => {
                return (
                  <div>
                    <FiTool />
                    <span>{servico.servico} - </span>
                    <span>{servico.valor} - </span>
                    <span>{servico.porcentagem * 100}%</span>
                    <span>
                      {servico.valorPorcentagem &&
                        " - " + Number(servico.valorPorcentagem).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <GrMoney />
              {calcValores(ordem.servicos.map((servico) => servico.valor))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
