import "./style.css";
import { useOsPage } from "./index.hook";
import { CardOSComponent } from "../../components/CardOSComponent/index.component";

export function OsPage() {
  const { ordensServico, excludeColumn, handleGetValor } = useOsPage();

  return (
    <div className="ospage-main">
      {ordensServico.length > 0 &&
        ordensServico.map((os, i) => (
          <>
            <CardOSComponent os={os} key={i.toString()} />
          </>
        ))}
    </div>
  );
}