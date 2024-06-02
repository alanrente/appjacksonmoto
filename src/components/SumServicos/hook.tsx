import { useState } from "react";
import { IServico } from "../../interfaces/servico.interface";
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
    async mutationFn(idOsServicos: number) {
      setStates({ ...states, loading: true });
      await removeServicosOs(idOsServicos);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["ordens-servico"] });
      setStates({ ...states, loading: false });
      setshowModal(false);
      message.success(
        `Servico ${servicoToDelete?.idServico} deletado da Os ${servicoToDelete?.osServico.OrdemServicoId}`
      );
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
      osServico: { idOsServicos },
    } = servicoToDelete;

    await mutationOk.mutateAsync(idOsServicos);
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
