import axios from "axios";
import getBearerToken from "../utils/getBearerToken.util";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: getBearerToken() },
});
