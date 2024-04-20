export enum ESession {
  user = "@user",
}

export const tagIdOrdemServico = (idOrdemServico: string | number) => {
  return `#${idOrdemServico.toString().padStart(5, "0")}`;
};
