export enum TipoDeCertificado {
  Incentivo = "Incentivo à Ciência",
  Excelencia = "Excelência em Pesquisa",
}

export interface Projeto {
  nome: string;
  dataEmissao: Date;
  tipoCertificado: TipoDeCertificado;
  autores: string[];
}
