import "./style.css";
import { RiToolsFill } from "react-icons/ri";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { Button } from "antd";

export function CardOSComponent({ os }: { os: IOrdemServico }) {
  return (
    <div className="card-os">
      <div className="card-os__mecanico">{os.mecanico.nome}</div>
      <Button icon={<RiToolsFill size={20} />} prefixCls="card-os__button">
        {os.servicos.length > 9 ? "+9" : os.servicos.length}
      </Button>
    </div>
  );
}
