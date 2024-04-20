import { useAuxConfirmWarning } from "../hooks/useAuxConfirmWarning";
import { useConfirmWarning } from "../hooks/useConfirmWarning";
import { useMessageAntd } from "../hooks/useMessageAntd";
import { TOrdemServicoCreate } from "../interfaces/servico.interface";
import { newAbortSignal } from "../utils/abortRequest";
import getBearerToken from "../utils/getBearerToken.util";
import { api } from "./axios.service";
import { message } from "antd";

export async function getAllOs() {
  const { data } = await api.get("ordem-servicos", {
    headers: { Authorization: getBearerToken() },
  });

  return data;
}

export function createOS(ordemServico: TOrdemServicoCreate) {
  api
    .get("ordem-servicos", {
      signal: newAbortSignal(2000),
      headers: { Authorization: getBearerToken() },
    })
    .then((res) => {
      useMessageAntd({ content: "OS criada!", type: "success" });

      return res.data;
    })
    .catch((err) => {
      if (!(err.message === "canceled")) return message.error(err.message);
      useConfirmWarning({
        props: {
          title: `Deseja reenviar OS de:`,
          onOk() {
            createOS(ordemServico);
          },
          content: useAuxConfirmWarning([
            { label: "Mecanico:", value: ordemServico.mecanico },
            { label: "Cliente:", value: ordemServico.cliente.nome },
            { label: "Placa:", value: ordemServico.cliente.placa },
            { label: "Contato:", value: ordemServico.cliente.contato },
          ]),
        },
      });
    });
}
