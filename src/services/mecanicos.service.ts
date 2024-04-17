import { IMecanico } from "../interfaces/servico.interface";
import getBearerToken from "../utils/getBearerToken.util";
import { api } from "./axios.service";

export async function getAllMecanicos(): Promise<IMecanico[]> {
  const { data } = await api.get("/mecanico", {
    headers: {
      Authorization: getBearerToken(),
    },
  });

  return data as IMecanico[];
}
