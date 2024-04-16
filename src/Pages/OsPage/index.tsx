import "./style.css";
import { useOsPage } from "./index.hook";
import { CardOSComponent } from "../../components/CardOSComponent/index.component";
import { Button } from "antd";

export function OsPage() {
  const { ordensServico, excludeColumn, handleGetValor } = useOsPage();

  return (
    <div className="ospage-main">
      <div className="ospage-novo">
        <Button>Novo Serviço</Button>
      </div>
      <div className="ospage-cards">
        {ordensServico.length > 0 &&
          ordensServico.map((os, i) => (
            <>
              <CardOSComponent os={os} key={i.toString()} />
            </>
          ))}
      </div>
    </div>
  );
}
