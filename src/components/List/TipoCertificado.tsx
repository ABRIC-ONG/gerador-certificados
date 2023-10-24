import { CertificationType } from "../../entities/Projeto";

interface TipoCertificadoProps {
  tipoCertificado: CertificationType;
}
export const TipoCertificado = (props: TipoCertificadoProps) => {
  const { tipoCertificado } = props;
  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl inline">
        Tipo de certificado:
      </h2>
      <p className="mb-6 overflow-hidden text-ellipsis text-lg py-1 lg:text-xl">
        {CertificationType[tipoCertificado]}
      </p>
    </>
  );
};
