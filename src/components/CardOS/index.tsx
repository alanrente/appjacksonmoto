import "./style.css";
import { RiToolsFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { Button, Modal } from "antd";
import { SumServicosComponent } from "../SumServicos";
import { useCardOS } from "./hook";
import { FormAddServicoOs } from "../FormAddServicoOs";
import { GrClose } from "react-icons/gr";

export function CardOSComponent({ os }: { os: IOrdemServico }) {
  const {
    loading,
    visible,
    fecharOs,
    openModal,
    titleModal,
    mutFecharOs,
    setFecharOs,
    handleClick,
    setopenModal,
    handleVisible,
    tagIdOrdemServico,
  } = useCardOS(os);

  return (
    <div className="card-os">
      <div className="card-os__mecanico">
        {tagIdOrdemServico(os.idOrdemServico)} - {os.mecanico.nome}
        {os.cliente.placa ? ` - ${os.cliente.placa}` : ` - ${os.cliente.nome}`}
        <GrClose onClick={() => handleClick(true)} />
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
            setFecharOs(false);
          }}
          onOk={async () => {
            await mutFecharOs.mutateAsync();
          }}
          confirmLoading={loading}
          okText={fecharOs && "Sim"}
          cancelText={fecharOs && "Não"}
          okButtonProps={fecharOs ? undefined : { style: { display: "none" } }}
          cancelButtonProps={
            fecharOs ? undefined : { style: { display: "none" } }
          }
          destroyOnClose
          closeIcon={false}
          title={
            <>
              {titleModal}
              {fecharOs && "Deseja fechar essa Ordem de Serviço?"}
            </>
          }
        >
          {fecharOs ? (
            <></>
          ) : (
            <FormAddServicoOs
              idOrdemServico={os.idOrdemServico}
              onCloseModal={() => {
                setopenModal(false);
              }}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
