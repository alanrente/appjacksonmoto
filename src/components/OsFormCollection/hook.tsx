import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { ETempSession } from "../../interfaces/temps.interface";
import { TOrdemServicoCreate } from "../../interfaces/servico.interface";

export function useOSFormCollection() {
  const [form] = useForm();
  const [disableInfosCliente, setdisableInfosCliente] = useState(false);

  useEffect(() => {
    const tempNovaOsLocal = JSON.parse(
      sessionStorage.getItem(ETempSession.TempNovaOs) || "{}"
    ) as TOrdemServicoCreate;

    if (Object.keys(tempNovaOsLocal).length > 0) {
      const { cliente, mecanico } = tempNovaOsLocal;
      const fields: { [key: string]: string } = { ...cliente, mecanico };

      Object.keys(fields).forEach(function (field) {
        form.setFieldValue(field, fields[field]);
      });
    }
  }, [form]);

  return { form, disableInfosCliente, setdisableInfosCliente };
}
