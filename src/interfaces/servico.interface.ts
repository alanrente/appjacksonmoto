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

export interface IMecanico {
  idMecanico: number;
  nome: string;
}

export interface ICliente {
  idCliente: 1;
  nome: string;
  placa: string;
  contato: string;
}

export interface IOrdemServico {
  idOrdemServico: number;
  dataExecucao: string;
  mecanicoId: number;
  clienteId: number;
  mecanico: IMecanico;
  cliente: ICliente;
  servicos: IServico[];
}
