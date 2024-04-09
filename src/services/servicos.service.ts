import { Servico } from "../interfaces/servico.interface";
import getBearerToken from "../utils/getBearerToken.util";
import { api } from "./axios.service";

export async function getAllServicos() {
  const servicos = await api.get("servicos", {
    headers: {
      Authorization: getBearerToken(),
    },
  });
  return servicos.data as Servico[];
}
