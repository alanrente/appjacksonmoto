import { ChangeEvent, useState } from "react";
import { getAllServicos } from "../../services/servicos.service";
import { useQuery } from "@tanstack/react-query";
import { IServico } from "../../interfaces/servico.interface";
import { InputProps } from "antd";

type stateProps = {
  openModal: boolean;
  servico?: IServico;
  inputPorcentagem: InputProps["status"];
};

export function useServicosPage() {
  const [states, setStates] = useState<stateProps>({
    openModal: false,
    servico: undefined,
    inputPorcentagem: "",
  });

  const { data: servs } = useQuery({
    queryKey: ["servicos"],
    queryFn: async () => {
      return await getAllServicos();
    },
    gcTime: 0,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(`${e.currentTarget.id}-${e.currentTarget.value}`);
    const { servico, ...anothers } = states;

    setStates({
      ...anothers,
      servico: {
        ...servico,
        [e.currentTarget.id]: e.target.value,
      } as IServico,
    });
  }

  return { servs, states, setStates, handleChange };
}
