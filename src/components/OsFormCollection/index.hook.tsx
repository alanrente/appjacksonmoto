import { useForm } from "antd/es/form/Form";
import { useState } from "react";

export function useOSFormCollection() {
  const [form] = useForm();
  const [disableInfosCliente, setdisableInfosCliente] = useState(false);

  return { form, disableInfosCliente, setdisableInfosCliente };
}
