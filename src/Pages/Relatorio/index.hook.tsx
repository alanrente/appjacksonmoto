import { useState } from "react";
import { IOrdemServico } from "../../interfaces/servico.interface";

export function useRelatorio() {
  const [visible, setVisible] = useState(false);
  const [ordem, setOrdem] = useState<IOrdemServico>();

  function calcValores(listaValores: number[]) {
    if (listaValores.length === 0) return 0;
    if (listaValores.length === 1) return listaValores[0];

    return listaValores.reduce((a, b) => Number(a) + Number(b));
  }

  function handleClick(ordem: IOrdemServico) {
    setOrdem(ordem);
    setVisible(true);
  }

  return { ordem, visible, setVisible, calcValores, handleClick };
}
