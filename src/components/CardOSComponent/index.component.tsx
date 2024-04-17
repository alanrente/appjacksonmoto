import "./style.css";
import { RiToolsFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { IOrdemServico } from "../../interfaces/servico.interface";
import { Button } from "antd";
import { SumServicosComponent } from "../SumServicosComponent";
import { useState } from "react";

export function CardOSComponent({ os }: { os: IOrdemServico }) {
  const [visible, setvisible] = useState(false);

  function handleVisible() {
    setvisible(!visible);
  }
  return (
    <div className="card-os">
      <div className="card-os__mecanico">
        {os.mecanico.nome} - {os.cliente.placa}
      </div>
      <div className="card-os__buttons">
        <Button prefixCls="card-os__button" onClick={handleVisible}>
          <RiToolsFill />
          {os.servicos.length > 9 ? "9+" : os.servicos.length}
        </Button>
        <Button prefixCls="card-os__button">
          <FiPlus />
        </Button>
      </div>
      <div>
        <SumServicosComponent servicos={os.servicos} show={visible} />
      </div>
    </div>
  );
}
