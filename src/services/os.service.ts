import { useAuxConfirmWarning } from "../hooks/useAuxConfirmWarning";
import { useConfirmWarning } from "../hooks/useConfirmWarning";
import { useMessageAntd } from "../hooks/useMessageAntd";
import { QueryOrdemServico } from "../interfaces/query.interface";
import {
  IOrdemServico,
  ServicosAddOs,
  TOrdemServicoCreate,
} from "../interfaces/servico.interface";
import { ETempSession } from "../interfaces/temps.interface";
import { newAbortSignal } from "../utils/abortRequest";
import { tagIdOrdemServico } from "../utils/constants.util";
import getBearerToken from "../utils/getBearerToken.util";
import { api } from "./axios.service";
import { message } from "antd";

export async function getAllOs({
  timeoutMs,
  clienteId,
  dtFim,
  dtInicio,
  includeTotais,
  mecanicoId,
}: { timeoutMs?: number } & QueryOrdemServico) {
  const query: any = {
    dtInicio,
    dtFim,
    clienteId,
    includeTotais,
    mecanicoId,
  };

  let queryStr = "?",
    includeQuery = false;

  for (const key in query) {
    const element = query[key];
    if (element) {
      queryStr += key + "=" + element + "&";
      includeQuery = true;
    }
  }

  const { data } = await api.get(
    `ordem-servicos${includeQuery ? queryStr : ""}`,
    {
      signal: newAbortSignal(timeoutMs),
      headers: { Authorization: getBearerToken() },
    }
  );

  return data;
}

async function createOrdemServico({
  timeoutMs,
  ordem,
}: {
  ordem: TOrdemServicoCreate;
  timeoutMs?: number;
}) {
  const { data } = await api.post("/ordem-servicos", ordem, {
    signal: newAbortSignal(timeoutMs),
    headers: { Authorization: getBearerToken() },
  });

  return data as IOrdemServico;
}

export async function createOS(ordemServico: TOrdemServicoCreate) {
  sessionStorage.setItem(ETempSession.TempNovaOs, JSON.stringify(ordemServico));
  return createOrdemServico({ timeoutMs: 15000, ordem: ordemServico })
    .then((res) => {
      useMessageAntd({
        type: "success",
        content: `OS ${tagIdOrdemServico(res.idOrdemServico)} Criada`,
      });
      sessionStorage.removeItem(ETempSession.TempNovaOs);
      return res;
    })
    .catch((err) => {
      if (!(err.message === "canceled")) return message.error(err.message);
      useConfirmWarning({
        props: {
          title: `Deseja reenviar OS de:`,
          onOk() {
            createOS(ordemServico);
          },
          onCancel() {
            sessionStorage.removeItem(ETempSession.TempNovaOs);
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

export async function addServicosInOs(servicosAndIdOS: ServicosAddOs) {
  return await api
    .post("/ordem-servicos/adicionar-servicos-os", servicosAndIdOS, {
      headers: { Authorization: getBearerToken() },
    })
    .then((res) => {
      useMessageAntd({ content: "Serviços criados", type: "success" });
      return res;
    })
    .catch((err) =>
      useMessageAntd({ content: `${err.message}`, type: "error" })
    );
}
