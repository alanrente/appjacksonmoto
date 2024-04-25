import "./App.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/browserRouter.route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
