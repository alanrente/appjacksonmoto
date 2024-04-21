import "./style.css";
import { RiToolsFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { Button, Modal } from "antd";
import { SumServicosComponent } from "../SumServicos";
import { useCardOS } from "./hook";
import { FormAddServicoOs } from "../FormAddServicoOs";

export function CardOSComponent({ os }: { os: IOrdemServico }) {
  const {
    handleClick,
    visible,
    handleVisible,
    openModal,
    setopenModal,
    titleModal,
    tagIdOrdemServico,
  } = useCardOS(os);

  return (
    <div className="card-os">
      <div className="card-os__mecanico">
        {tagIdOrdemServico(os.idOrdemServico)} - {os.mecanico.nome} -{" "}
        {os.cliente.placa}
      </div>
      <div className="card-os__buttons">
        <Button prefixCls="card-os__button" onClick={handleVisible}>
          <RiToolsFill />
          {os.servicos.length > 9 ? "9+" : os.servicos.length}
        </Button>
        <Button prefixCls="card-os__button" onClick={() => handleClick()}>
          <FiPlus />
        </Button>
      </div>
      <div>
        <SumServicosComponent servicos={os.servicos} show={visible} />
      </div>
      {openModal && (
        <Modal
          open={openModal}
          onCancel={() => {
            setopenModal(false);
          }}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          destroyOnClose
          closeIcon={false}
          title={titleModal}
        >
          <FormAddServicoOs
            idOrdemServico={os.idOrdemServico}
            onCloseModal={() => {
              setopenModal(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
