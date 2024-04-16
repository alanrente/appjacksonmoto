import "./style.css";
import { IServico } from "../../interfaces/servico.interface";
import { Divider, Modal } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";

interface IProps {
  servicos: IServico[];
  show: boolean;
  args?: HTMLDivElement;
}

export function SumServicosComponent({ servicos, args, show }: IProps) {
  const [servicoToDelete, setservicoToDelete] = useState<IServico>();
  const [showModal, setshowModal] = useState(false);

  function handleDelete(serv: IServico) {
    setservicoToDelete(serv);
    setshowModal(true);
  }

  function handleCancel() {
    setservicoToDelete(undefined);
    setshowModal(false);
  }
  return (
    <div
      className="sum-servicos__servico"
      style={{ display: show ? "" : "none" }}
    >
      <Divider type="horizontal" prefixCls="sum-servicos__divider" />
      {servicos.map((serv) => {
        return (
          <div className="sum-servicos__conteudo">
            <MdEdit />
            <span>{`${serv.servico}`.slice(0, 35)}</span>
            <span>{serv.osServico.valor}</span>
            <MdDelete onClick={() => handleDelete(serv)} />
          </div>
        );
      })}
      <Divider type="horizontal" prefixCls="sum-servicos__divider" />
      <span className="sum-servicos__soma">
        {servicos.length > 0 &&
          servicos
            .map((serv) => serv.osServico.valor)
            .reduce((a, b) => Number(a) + Number(b))}
      </span>
      <Modal
        open={showModal}
        title={`Deseja deletar o serviço "${servicoToDelete?.servico.toUpperCase()}" desta OS?`}
        okText={"Sim"}
        onCancel={handleCancel}
        destroyOnClose
        cancelText={"Não!"}
        closable={false}
      ></Modal>
    </div>
  );
}
