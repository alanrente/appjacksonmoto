import "./App.css";
import "react-day-picker/dist/style.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/browserRouter.route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
