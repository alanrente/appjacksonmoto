import "./style.css";

export function CardServico({
  strServico,
  valor,
}: {
  strServico: string;
  valor: string | number;
}) {
  return (
    <div className="card-servico">
      <div className="card-servico__valores">
        <div>
          <label>Serviço: </label>
          <span>{strServico}</span>
        </div>
        <div>
          <label>Valor: </label>
          <span>{valor}</span>
        </div>
      </div>
      <div className="card-servico__botoes">
        <button>Editar</button>
        <button>Excluir</button>
      </div>
    </div>
  );
}
