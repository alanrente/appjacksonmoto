import { IServico } from "../../interfaces/servico.interface";
import "./style.css";
import { toFixedAndComma } from "../../utils/constants.util";
import { MouseEventHandler } from "react";
import { RepositoryIcons } from "../../assets/icons/repository";

export function CardServico({
  servico,
  onclick,
}: {
  servico: IServico;
  onclick?: MouseEventHandler;
}) {
  const { Edit } = RepositoryIcons();
  return (
    <div className="card-servico">
      <div className="card-servico__valores">
        <div>
          <span>{servico.servico}</span>
        </div>
        <div>
          <label>Valor: </label>
          <span>{toFixedAndComma(servico.valor)}</span>
        </div>
        <div>
          <label>Repasse(%): </label>
          <span>{servico.porcentagem}%</span>
        </div>
      </div>

      <Edit onClick={onclick} className="card-servico__botoes" />
    </div>
  );
}
