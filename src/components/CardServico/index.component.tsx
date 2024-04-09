export function CardServico({
  strServico,
  valor,
}: {
  strServico: string;
  valor: string | number;
}) {
  return (
    <div>
      <div>
        <label>Serviço: </label>
        <span>{strServico}</span>
      </div>
      <div>
        <label>Valor: </label>
        <span>{valor}</span>
      </div>
    </div>
  );
}
