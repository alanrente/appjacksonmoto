import { Button } from "antd";
import "./style.css";

type Props = {
  children: JSX.Element | JSX.Element[];
  onClick?: () => void;
  showButton?: boolean;
  textButton?: string;
};

export function ScrollContainerVertical({
  children,
  onClick,
  showButton = true,
  textButton = "Novo",
}: Props) {
  return (
    <div className="scroll-container__main">
      <div className="scroll-container__novo">
        {showButton && (
          <Button onClick={onClick} prefixCls="scroll-container__button">
            {textButton}
          </Button>
        )}
      </div>
      <div className="scroll-container__cards">{children}</div>
    </div>
  );
}
