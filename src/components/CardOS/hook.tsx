import { useState } from "react";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { Divider, message } from "antd";
import { tagIdOrdemServico } from "../../utils/constants.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeOrReopen } from "../../services/os.service";

export function useCardOS(os: IOrdemServico) {
  const queryClient = useQueryClient();

  const [fecharOs, setFecharOs] = useState(false);
  const [visible, setvisible] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [titleModal, settitleModal] = useState(<></>);
  const [loading, setLoading] = useState(false);

  function handleVisible() {
    setvisible(!visible);
  }

  const mutFecharOs = useMutation({
    async mutationFn() {
      setLoading(true);
      await closeOrReopen({ id: os.idOrdemServico, openOrReopen: "fechar" });
    },
    onError(err) {
      setopenModal(false);
      setLoading(false);
      message.error(err.message);
    },
    async onSuccess() {
      setFecharOs(false);
      setopenModal(false);
      message.success(`OS: ${tagIdOrdemServico(os.idOrdemServico)} fechada!`);
      setLoading(false);
      await queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
    },
    gcTime: 0,
  });

  function handleClick(closeOrdem?: boolean) {
    const descriptionModal = (
      <>
        <span>
          {`${tagIdOrdemServico(os.idOrdemServico)} - ${os.mecanico.nome}`}
        </span>
        <br />
        <span>
          Cliente: {os.cliente.nome} - {os.cliente.placa} - {os.cliente.contato}
        </span>
        <Divider />
      </>
    );
    closeOrdem && setFecharOs(true);
    setopenModal(true);
    settitleModal(descriptionModal);
  }

  return {
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
  };
}
