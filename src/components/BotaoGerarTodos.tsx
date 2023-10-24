import { Projeto } from "../entities/Projeto";
import { gerarCertificado } from "../utils/GeradorCertificado";

interface BotaoGerarTodosProps {
  projetos: Projeto[];
}

export const GenerateAllButton = (props: BotaoGerarTodosProps) => {
  const { projetos } = props;

  return (
    <>
      <button
        className="bg-primary py-2 text-white font-bold mt-4"
        hidden={projetos?.length <= 1}
        onClick={() => projetos?.forEach((person) => gerarCertificado(person))}
      >
        Baixar todos os {projetos.length} certificados
      </button>
    </>
  );
};
