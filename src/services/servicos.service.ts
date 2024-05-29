import { useMessageAntd } from "../hooks/useMessageAntd";
import { IServico } from "../interfaces/servico.interface";
import { calculaPorcentagem } from "../utils/constants.util";
import getBearerToken from "../utils/getBearerToken.util";
import { api } from "./axios.service";

export async function getAllServicos() {
  const servicos = await api.get("servicos", {
    headers: {
      Authorization: getBearerToken(),
    },
  });
  return servicos.data as IServico[];
}

export async function update(servico: IServico) {
  const { idServico, ...anothers } = servico;
  await api
    .put(
      `servicos/${idServico}`,
      {
        ...anothers,
        porcentagem: calculaPorcentagem(anothers.porcentagem),
        valor: +anothers.valor,
      },
      {
        headers: {
          Authorization: getBearerToken(),
        },
      }
    )
    .then(() => {
      useMessageAntd({
        content: `Serviço:${idServico} atualizado!`,
        type: "success",
      });
    })
    .catch((err) => {
      useMessageAntd({ type: "error", content: `${err.message}` });
    });
}
