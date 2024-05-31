import { useState } from "react";
import { IServico, ServicoDellOs } from "../../interfaces/servico.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { removeServicosOs } from "../../services/os.service";

type StatesSumServicos = {
  loading: boolean;
};

export function useSumServicos() {
  const queryClient = useQueryClient();
  const [servicoToDelete, setservicoToDelete] = useState<IServico>();
  const [states, setStates] = useState<StatesSumServicos>({ loading: false });
  const [showModal, setshowModal] = useState(false);

  function handleDelete(serv: IServico) {
    setservicoToDelete(serv);
    setshowModal(true);
  }

  function handleCancel() {
    setservicoToDelete(undefined);
    setshowModal(false);
  }

  const mutationOk = useMutation({
    async mutationFn({ ServicoId, OrdemServicoId }: ServicoDellOs) {
      setStates({ ...states, loading: true });
      await removeServicosOs({ ServicoId, OrdemServicoId });
    },
    onSuccess(_, { OrdemServicoId, ServicoId }) {
      queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
      setStates({ ...states, loading: false });
      setshowModal(false);
      message.success(`Servico ${ServicoId} deletado da Os ${OrdemServicoId}`);
    },
    onError(error) {
      message.error(error.message);
      setStates({ ...states, loading: false });
      setshowModal(false);
    },
    gcTime: 0,
  });

  async function handleOk() {
    if (!servicoToDelete) return;
    const {
      idServico,
      osServico: { OrdemServicoId },
    } = servicoToDelete;

    await mutationOk.mutateAsync({ ServicoId: idServico, OrdemServicoId });
  }

  return {
    servicoToDelete,
    showModal,
    states,
    handleOk,
    setservicoToDelete,
    setshowModal,
    handleDelete,
    handleCancel,
  };
}
