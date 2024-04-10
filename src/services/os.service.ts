import getBearerToken from "../utils/getBearerToken.util";
import { api } from "./axios.service";

export async function getAllOs() {
  const { data } = await api.get("ordem-servicos", {
    headers: { Authorization: getBearerToken() },
  });

  return data;
}
