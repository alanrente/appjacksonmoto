import "./style.css";
import { IServico } from "../../interfaces/servico.interface";
import { Divider } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import { toFixedAndComma } from "../../utils/constants.util";
import { useSumServicos } from "./hook";
import { ModalAntd } from "../../instances/ModalAntd";

interface IProps {
  servicos: IServico[];
  show: boolean;
  args?: HTMLDivElement;
}

export function SumServicosComponent({ servicos, args, show }: IProps) {
  const {
    handleDelete,
    handleCancel,
    servicoToDelete,
    showModal,
    handleOk,
    states,
  } = useSumServicos();

  return (
    <div
      className="sum-servicos__servico"
      style={{ display: show ? "" : "none" }}
    >
      <Divider type="horizontal" prefixCls="sum-servicos__divider" />
      {servicos.map((serv, i) => {
        return (
          <div key={i.toString()} className="sum-servicos__conteudo">
            <div className="sum-servicos__descricao-valor">
              <MdDelete onClick={() => handleDelete(serv)} size={20} />
              <span>{`${serv.servico}`.slice(0, 35)}</span>
              <span>{toFixedAndComma(serv.osServico.valor)}</span>
            </div>
          </div>
        );
      })}
      <Divider type="horizontal" prefixCls="sum-servicos__divider" />
      <span className="sum-servicos__soma">
        {servicos.length > 0 &&
          toFixedAndComma(
            servicos
              .map((serv) => serv.osServico.valor)
              .reduce((a, b) => Number(a) + Number(b))
          )}
      </span>
      <ModalAntd
        modalProps={{
          open: showModal,
          title: `Deseja deletar o serviço "${servicoToDelete?.servico.toUpperCase()}" desta OS?`,
          okText: "Sim",
          onCancel: handleCancel,
          onOk: handleOk,
          confirmLoading: states.loading,
          destroyOnClose: true,
          cancelText: "Não",
          closable: false,
        }}
      />
    </div>
  );
}
