import { Button } from "antd";
import "./style.css";

type Props = {
  children: JSX.Element[];
  onClick?: () => void;
};

export function ScrollContainerWithButton({ children, onClick }: Props) {
  return (
    <div className="scroll-container__main">
      <div className="scroll-container__novo">
        <Button onClick={onClick} prefixCls="scroll-container__button">
          Nova Ordem de Serviço
        </Button>
      </div>
      <div className="scroll-container__cards">{children}</div>
    </div>
  );
}
