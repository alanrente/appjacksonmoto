import { TCliente } from "../interfaces/servico.interface";
import getBearerToken from "../utils/getBearerToken.util";
import { api } from "./axios.service";

export async function getAllClientes(): Promise<TCliente[]> {
  const { data } = await api.get("/cliente", {
    headers: {
      Authorization: getBearerToken(),
    },
  });

  return data as TCliente[];
}
