import { TipoDeCertificado as TipoDoCertificado } from "../../entities/Projeto";

interface TipoCertificadoProps {
  tipoDoCertificado: TipoDoCertificado;
}
export const TipoCertificado = (props: TipoCertificadoProps) => {
  const { tipoDoCertificado } = props;
  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl inline">
        Tipo do certificado:
      </h2>
      <p className="mb-6 overflow-hidden text-ellipsis text-lg py-1 lg:text-xl">
        {tipoDoCertificado}
      </p>
    </>
  );
};
