import { useEffect, useRef, useState } from "react";
import { api } from "../../services/axios.service";

export function useLayout() {
  const [serverIsOnline, setserverIsOnline] = useState(false);
  const [visible, setvisible] = useState(false);

  let refSideBar = useRef<any>();

  async function getStatusApi() {
    const { status } = await api.get("");

    setserverIsOnline(!!status.toString().includes("20"));
  }

  function checkClickOutside(e: any) {
    console.log("checkClickOutside refSideBar", e.target);
    if (!e.target) return;

    if (visible && !refSideBar.current?.contains(e.target)) {
      setvisible(false);
    }
  }

  useEffect(() => {
    getStatusApi();
    document.addEventListener("mousedown", checkClickOutside);

    return () => document.removeEventListener("mousedown", checkClickOutside);
  });

  return { serverIsOnline, visible, refSideBar, setvisible };
}
