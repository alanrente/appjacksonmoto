import "./style.css";
import { IOrdemServico } from "../../interfaces/servico.interface";

export function CardOSComponent({ os }: { os: IOrdemServico }) {
  return <div className="card-os-component">{os.cliente.nome}</div>;
}
