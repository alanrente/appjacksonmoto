import { useState } from "react";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { Divider } from "antd";
import { tagIdOrdemServico } from "../../utils/constants.util";

export function useCardOS(os: IOrdemServico) {
  const [visible, setvisible] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [titleModal, settitleModal] = useState(<></>);

  function handleVisible() {
    setvisible(!visible);
  }

  function handleClick() {
    const descriptionModal = (
      <>
        <span>
          Ordem:{" "}
          {`${tagIdOrdemServico(os.idOrdemServico)} - ${os.mecanico.nome}`}
        </span>
        <br />
        <span>
          Cliente: {os.cliente.nome} - {os.cliente.placa} - {os.cliente.contato}
        </span>
        <Divider />
      </>
    );
    setopenModal(true);
    settitleModal(descriptionModal);
  }

  return {
    handleClick,
    visible,
    handleVisible,
    openModal,
    setopenModal,
    titleModal,
    tagIdOrdemServico,
  };
}
