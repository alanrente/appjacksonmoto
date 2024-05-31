import { useEffect, useRef, useState } from "react";

export function useLayout() {
  const [visible, setvisible] = useState(false);

  let refSideBar = useRef<any>();

  function checkClickOutside(e: any) {
    if (!e.target) return;

    if (visible && !refSideBar.current?.contains(e.target)) {
      setvisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", checkClickOutside);

    return () => document.removeEventListener("mousedown", checkClickOutside);
  });

  return { visible, refSideBar, setvisible };
}
