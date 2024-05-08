import "./style.css";
import { ScrollContainerHorizontal } from "../../components/ScrollContainerHorizontal";
import { useRelatorio } from "./hook";
import { format } from "date-fns";
import { CalendarFilled } from "@ant-design/icons";
import { FiTool, FiUser } from "react-icons/fi";
import { GrMoney, GrUserWorker } from "react-icons/gr";
import { Button, Modal, Skeleton } from "antd";
import { ScrollContainerVertical } from "../../components/ScrollContainerWithButton";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { MdHomeRepairService, MdOutlineAttachMoney } from "react-icons/md";
import { DATA, toFixedAndComma } from "../../utils/constants.util";
import moment from "moment-timezone";

export function Relatorio() {
  const {
    ordem,
    range,
    ordens,
    visible,
    isLoading,
    showDatePicker,
    setVisible,
    calcValores,
    handleClick,
    handleClickInput,
    onSelectDayPicker,
  } = useRelatorio();

  return (
    <>
      <ScrollContainerHorizontal>
        <Button
          className="input-relatorio"
          value={
            range && range.from && range.to
              ? format(range.from, "dd/MM/yyyy") +
                " - " +
                format(range.to, "dd/MM/yyyy")
              : ""
          }
          onClick={handleClickInput}
        >
          {range && range.from && range.to
            ? format(range.from, "dd/MM/yyyy") +
              " - " +
              format(range.to, "dd/MM/yyyy")
            : ""}
        </Button>
        {/* <button>Mecanico</button>
        <button>Cliente</button> */}
      </ScrollContainerHorizontal>
      {!isLoading && ordens && (
        <div className="div-infos" key={"infos-relatorio"}>
          <div>
            <FiUser />
            <span>
              {new Set(ordens.ordensServicos.map((or) => or.cliente.nome)).size}
            </span>
          </div>
          <div>
            <GrUserWorker />
            <span>
              {
                new Set(ordens.ordensServicos.map((or) => or.mecanico.nome))
                  .size
              }
            </span>
          </div>
          <div>
            <MdHomeRepairService />
            <span>{ordens.totalServicos || 0}</span>
          </div>
          <div>
            <MdOutlineAttachMoney />
            <span>{toFixedAndComma(ordens.totalOs || 0)}</span>
          </div>
          <div>
            <GrMoney />
            <span>{toFixedAndComma(ordens.totalMecanico || 0)}</span>
          </div>
        </div>
      )}
      <ScrollContainerVertical showButton={false}>
        <div className="div-main">
          {(isLoading || !ordens) && (
            <Skeleton active key={"skeleton-os-page"} />
          )}
          {!isLoading &&
            ordens &&
            ordens.ordensServicos.map((ordem) => (
              <>
                <div
                  key={ordem.idOrdemServico.toString()}
                  className="div-container"
                  onClick={() => handleClick(ordem)}
                >
                  <div>
                    <CalendarFilled />
                    {moment(`${ordem.dataExecucao}`).format("DD/MM/YYYY")}
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
                </div>
              </>
            ))}
        </div>
      </ScrollContainerVertical>
      <Modal
        open={visible}
        title={ordem?.idOrdemServico.toString().padStart(6, "0")}
        destroyOnClose
        closeIcon={false}
        onCancel={() => !showDatePicker && setVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {showDatePicker && (
          <DayPicker
            mode="range"
            locale={ptBR}
            selected={range}
            defaultMonth={new Date()}
            weekStartsOn={1}
            onSelect={onSelectDayPicker}
          />
        )}
        {ordem && !showDatePicker && (
          <>
            <div>
              <CalendarFilled />
              {moment(ordem.dataExecucao).format(DATA.BR)}
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
                  <GrMoney />
                  <span>{toFixedAndComma(ordem.totalMecanico || 0)}</span>
                </>
              )}
            </div>
            <div>
              {ordem.servicos.map((servico) => {
                return (
                  <div>
                    <FiTool />
                    <span>{servico.servico} - </span>
                    <span>{toFixedAndComma(servico.valor || 0)} - </span>
                    <span>{servico.porcentagem * 100}%</span>
                    <span>
                      {servico.valorPorcentagem &&
                        " - " + toFixedAndComma(servico.valorPorcentagem || 0)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <MdOutlineAttachMoney />
              {toFixedAndComma(
                calcValores(ordem.servicos.map((servico) => servico.valor) || 0)
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
