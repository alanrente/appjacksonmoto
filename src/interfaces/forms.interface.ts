import { FormInstance } from "antd";
import { TCliente, TMecanico, TClienteCreate } from "./servico.interface";

export interface ValuesAutocomplete {
  mecanicos: TMecanico[];
  clientes: TCliente[];
}
export interface Values {
  mecanico: string;
  cliente: TClienteCreate;
}
export interface CollectionForm {
  initialValues?: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
  onFinish: (e: any) => void;
  onCancel: (e: any) => void;
  valuesAutocomplete?: ValuesAutocomplete;
}
