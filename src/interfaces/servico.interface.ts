export interface IOsServico {
  valor: number | string;
  ServicoId: number;
  OrdemServicoId: number;
}

export interface IServico {
  idServico: number;
  servico: string;
  valor: number;
  osServico: IOsServico;
}

export type TMecanicoCreate = {
  mecanico: string;
};
export type TMecanico = TClienteCreate & {
  idMecanico: number;
};

export type TClienteCreate = {
  nome: string;
  placa: string;
  contato: string;
};

export type TCliente = TClienteCreate & {
  idCliente: number;
};

export interface IOrdemServico {
  idOrdemServico: number;
  dataExecucao: string;
  mecanicoId: number;
  clienteId: number;
  mecanico: TMecanico;
  cliente: TCliente;
  servicos: IServico[];
}

export type TOrdemServicoCreate = {
  servicos?: IServico[];
  mecanico: string;
  cliente: TClienteCreate;
};
