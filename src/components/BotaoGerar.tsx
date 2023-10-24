import { Projeto } from "../entities/Projeto";
import { gerarCertificado } from "../utils/GeradorCertificado";

interface BotaoGerarProps {
  projetoSelecionado: Projeto;
}

export const BotaoGerar = (props: BotaoGerarProps) => {
  const { projetoSelecionado } = props;

  return (
    <>
      <button
        className="bg-primary py-2 text-white font-bold mt-4"
        onClick={() => gerarCertificado(projetoSelecionado)}
      >
        Baixar apenas este certificado
      </button>
    </>
  );
};
