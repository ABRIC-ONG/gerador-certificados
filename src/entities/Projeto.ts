export enum CertificationType {
  Incentivo,
  Excelencia,
}

export interface Projeto {
  nome: string;
  dataEmissao: Date;
  tipoCertificado: CertificationType;
  autores: string[];
}
