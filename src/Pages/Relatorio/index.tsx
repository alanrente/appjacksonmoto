import "./style.css";
import { ScrollContainerHorizontal } from "../../components/ScrollContainerHorizontal";
import { useRelatorio } from "./hook";
import { format } from "date-fns";
import { CalendarFilled } from "@ant-design/icons";
import { FiTool, FiUser } from "react-icons/fi";
import { FaLock, FaUnlock } from "react-icons/fa";
import { GrMoney, GrUserWorker } from "react-icons/gr";
import { Button, Modal, Select, Skeleton } from "antd";
import { ScrollContainerVertical } from "../../components/ScrollContainerVertical";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { GoIssueReopened } from "react-icons/go";
import { MdHomeRepairService, MdOutlineAttachMoney } from "react-icons/md";
import {
  DATA,
  tagIdOrdemServico,
  toFixedAndComma,
} from "../../utils/constants.util";
import moment from "moment-timezone";

export function Relatorio() {
  const {
    ordem,
    range,
    ordens,
    visible,
    isLoading,
    mutReabrirOs,
    showDatePicker,
    optionsClientes,
    optionsMecanicos,
    setVisible,
    calcValores,
    handleClick,
    onSelectCliente,
    handleClickInput,
    onSelectDayPicker,
  } = useRelatorio();

  return (
    <>
      <ScrollContainerHorizontal>
        {range && range.from && range.to ? (
          <Button className="input-relatorio" onClick={handleClickInput}>
            {range &&
              range.from &&
              range.to &&
              format(range.from, "dd/MM/yyyy") +
                " - " +
                format(range.to, "dd/MM/yyyy")}
          </Button>
        ) : (
          <></>
        )}

        {optionsClientes ? (
          <Select
            onSelect={(e) => onSelectCliente(e, "clienteId")}
            style={{ minWidth: "100px" }}
            defaultValue={"0"}
            options={optionsClientes}
          />
        ) : (
          <></>
        )}

        {optionsMecanicos ? (
          <Select
            onSelect={(e) => onSelectCliente(e, "mecanicoId")}
            style={{ minWidth: "100px" }}
            defaultValue={"0"}
            options={optionsMecanicos}
          />
        ) : (
          <></>
        )}
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
        destroyOnClose
        centered
        closeIcon={false}
        onCancel={() => !showDatePicker && setVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {showDatePicker && (
          <DayPicker
            showOutsideDays
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                {!!ordem.status ? <FaUnlock /> : <FaLock />}
                {tagIdOrdemServico(ordem.idOrdemServico)}
              </div>
              {!ordem.status && (
                <Button
                  onClick={async () => {
                    await mutReabrirOs.mutateAsync(ordem.idOrdemServico);
                  }}
                >
                  <GoIssueReopened />
                </Button>
              )}
            </div>
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

              {ordem.totalMecanico ? (
                <>
                  <GrMoney />
                  <span>{toFixedAndComma(ordem.totalMecanico || 0)}</span>
                </>
              ) : null}
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
