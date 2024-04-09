import { getUser } from "./sessionUser.util";

export default function getBearerToken() {
  return getUser().chave;
}
