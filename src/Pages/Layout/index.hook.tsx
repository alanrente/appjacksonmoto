import { useEffect, useState } from "react";
import { api } from "../../services/axios.service";

export function useLayout() {
  const [serverIsOnline, setserverIsOnline] = useState(false);

  async function getStatusApi() {
    const { status } = await api.get("");

    setserverIsOnline(!!status.toString().includes("20"));
  }

  useEffect(() => {
    getStatusApi();
  }, []);

  return { serverIsOnline };
}
