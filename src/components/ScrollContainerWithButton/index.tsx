import { Button } from "antd";
import "./style.css";

export function ScrollContainerWithButton({children}: {children: JSX.Element[]}) {
  return (
    <div className="scroll-container__main">
      <div className="scroll-container__novo">
        <Button prefixCls="scroll-container__button">Novo Serviço</Button>
      </div>
      <div className="scroll-container__cards">{children}</div>
    </div>
  );
}
