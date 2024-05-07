export enum ESession {
  user = "@user",
}

export const tagIdOrdemServico = (idOrdemServico: string | number) => {
  return `#${idOrdemServico.toString().padStart(5, "0")}`;
};

export enum DATA {
  BR = "DD/MM/YYYY",
  BR_dateFns = "dd/MM/yyyy",
  US = "YYYY-MM-DD",
  US_dateFns = "yyyy-MM-dd",
}

export function toFixedAndComma(n: number, fractionDigits = 2) {
  return n.toFixed(fractionDigits).replace(".", ",");
}
