import { useOsPage } from "./index.hook";
import { CardOSComponent } from "../../components/CardOSComponent/index.component";
import { ScrollContainerWithButton } from "../../components/ScrollContainerWithButton";

export function OsPage() {
  const { ordensServico } = useOsPage();

  return (
    <ScrollContainerWithButton
      children={
        ordensServico.length > 0
          ? ordensServico.map((os, i) => (
              <CardOSComponent os={os} key={i.toString()} />
            ))
          : [<></>]
      }
    />
  );
}
