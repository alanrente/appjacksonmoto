export interface IOsServico {
  idOsServicos: number;
  valor: number | string;
  ServicoId: number;
  OrdemServicoId: number;
  valorPorcentagem: number;
}

export interface IServico {
  idServico: number;
  servico: string;
  valor: number;
  osServico: IOsServico;
  porcentagem: number;
}
export type IServicoSV = {
  servico: string;
  valor: number;
};

export type IServicoInitialValues = {
  servicos: IServicoSV[];
};

export type ServicosAddOs = {
  servicos: IServico[];
  idOrdemServico: number;
};

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
  totalMecanico?: number;
  dataExecucao: string;
  mecanicoId: number;
  clienteId: number;
  mecanico: TMecanico;
  cliente: TCliente;
  status: number;
  servicos: IServico[];
}

export type IRelatorio = {
  ordensServicos: IOrdemServico[];
  totalMecanico: number;
  totalOrdens: number;
  totalOs: number;
  totalServicos: number;
};

export type TOrdemServicoCreate = {
  servicos: IServico[];
  mecanico: string;
  cliente: TClienteCreate;
};
