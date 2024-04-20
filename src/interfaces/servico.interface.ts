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
  mecanico: IMecanico;
  cliente: TCliente;
  servicos: IServico[];
}

export interface IOrdemServicoCreate {
  servicos: IServico[];
  mecanico: string;
  cliente: {
    nome: string;
    placa: string;
    contato: string;
  };
}

type TestInitial = {
  id: string;
};

type TestFinal = TestInitial & {
  nome: string;
};
