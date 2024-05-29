import { ChangeEvent, useState } from "react";
import { getAllServicos, update } from "../../services/servicos.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IServico } from "../../interfaces/servico.interface";
import { InputProps } from "antd";

type stateProps = {
  openModal: boolean;
  servico?: IServico;
  inputPorcentagem: InputProps["status"];
  loading: boolean;
  invalidField: { [field: string]: boolean };
};

export function useServicosPage() {
  const queryClient = useQueryClient();

  const [states, setStates] = useState<stateProps>({
    openModal: false,
    servico: undefined,
    inputPorcentagem: "",
    loading: false,
    invalidField: {},
  });

  const { data: servs } = useQuery({
    queryKey: ["servicos"],
    queryFn: async () => {
      return (await getAllServicos()).map((serv) => ({
        ...serv,
        porcentagem: serv.porcentagem * 100,
      }));
    },
    gcTime: 0,
  });

  const mutateServico = useMutation({
    async mutationFn() {
      setStates({ ...states, loading: true });
      states.servico && (await update(states.servico));
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["servicos"] });
      setStates({ ...states, loading: false, openModal: false });
    },
  });

  async function handleOk() {
    await mutateServico.mutateAsync();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { servico, ...anothers } = states;

    setStates({
      ...anothers,
      servico: {
        ...servico,
        [e.currentTarget.id]:
          e.currentTarget.id === "porcentagem" || e.currentTarget.id === "valor"
            ? Number(e.target.value)
            : e.target.value,
      } as IServico,
    });
  }

  function porcentagemIsValid(porcentagem: number) {
    return porcentagem > 0 && porcentagem <= 100;
  }

  return {
    servs,
    states,
    setStates,
    handleChange,
    handleOk,
    porcentagemIsValid,
  };
}
