import { FormInstance } from "antd";
import { TCliente, IMecanico } from "./servico.interface";

export interface ValuesAutocomplete {
  mecanicos: IMecanico[];
  clientes: TCliente[];
}
export interface Values {
  mecanico: string;
  cliente: string;
  placa: string | null;
  contato: string | null;
}
export interface CollectionForm {
  initialValues?: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
  onFinish: (e: any) => void;
  onCancel: (e: any) => void;
  valuesAutocomplete?: ValuesAutocomplete;
}
