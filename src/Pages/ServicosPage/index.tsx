import { CardServico } from "../../components/CardServico";
import { useServicosPage } from "./hook";

export function ServicosPage() {
  const { servicos } = useServicosPage();
  return (
    <div>
      <button>Novo Serviço</button>
      {servicos ? (
        servicos.map((servico) => (
          <CardServico strServico={servico.servico} valor={servico.valor} />
        ))
      ) : (
        <>ServicoPage</>
      )}
    </div>
  );
}
