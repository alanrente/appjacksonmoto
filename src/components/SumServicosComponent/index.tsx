import "./style.css";
import { IServico } from "../../interfaces/servico.interface";
import { Divider } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";

interface IProps {
  servicos: IServico[];
  show: boolean;
  args?: HTMLDivElement;
}

export function SumServicosComponent({ servicos, args, show }: IProps) {
  return (
    <div
      className="sum-servicos__servico"
      style={{ display: show ? "" : "none" }}
    >
      <Divider type="horizontal" prefixCls="sum-servicos__divider" />
      {servicos.map((serv) => {
        return (
          <div>
            <span>{`${serv.servico}`.slice(0, 40)}</span>
            <span>{serv.osServico.valor}</span>
            <MdEdit />
            <MdDelete />
          </div>
        );
      })}
      <Divider type="horizontal" prefixCls="sum-servicos__divider" />
      {servicos.length > 0 &&
        servicos
          .map((serv) => serv.osServico.valor)
          .reduce((a, b) => Number(a) + Number(b))}
    </div>
  );
}
