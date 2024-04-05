import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "./auth.context";

export function protectedLoader({ request }: LoaderFunctionArgs) {
  if (!authProvider.hasUser()) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/?" + params.toString());
  }
  return null;
}
