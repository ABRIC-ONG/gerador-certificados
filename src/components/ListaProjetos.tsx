import { useEffect, useState } from "react";
import { ListPage } from "./List/ListPage";
import { BotaoGerar } from "./BotaoGerar";
import { GenerateAllButton } from "./BotaoGerarTodos";
import { DataEmissao } from "./List/DataEmissao";
import { NomeProjeto } from "./List/NomeProjeto";
import { Projeto } from "../entities/Projeto";
import { TipoCertificado } from "./List/TipoCertificado";
import { isPlural } from "../utils/IsPlural";
import { Autores } from "./List/Autores";

interface ListaProjetosProps {
  projetos: Projeto[];
}

const indexProjetoInicial = 0;

const ListaProjetos = (props: ListaProjetosProps) => {
  const { projetos } = props;
  const [indexProjeto, setIndexProjeto] = useState<number>(indexProjetoInicial);
  const [projetoSelecionado, setProjetoSelecionada] = useState<Projeto>(
    projetos[indexProjetoInicial]
  );

  useEffect(() => {
    const novoIndex = projetos.length - 1;
    setIndexProjeto(novoIndex);
    setProjetoSelecionada(projetos[novoIndex]);
  }, [projetos]);

  useEffect(() => {
    setProjetoSelecionada(projetos[indexProjeto]);
  }, [indexProjeto]);

  return (
    <div className="flex flex-col items-center w-full max-w-xl lg:w-1/2 lg:max-w-3xl">
      <div className="p-4 flex flex-col text-lg w-[90%] bg-gray-200">
        {projetos?.length > 0 ? (
          <>
            <h2 className="font-bold text-xl mb-4 lg:text-3xl">
              {projetos.length} certificado{isPlural(projetos.length) && "s"}{" "}
              cadastrado
              {isPlural(projetos.length) && "s"}
            </h2>
            <NomeProjeto nomeProjeto={projetoSelecionado?.nome} />
            <Autores autores={projetoSelecionado?.autores || []} />
            <DataEmissao dataEmissao={projetoSelecionado?.dataEmissao} />
            <TipoCertificado
              tipoDoCertificado={projetoSelecionado?.tipoCertificado}
            />
            <ListPage
              projectIndex={indexProjeto}
              setProjectIndex={setIndexProjeto}
              projectCount={projetos.length ?? 0}
            />
            <BotaoGerar projetoSelecionado={projetoSelecionado} />
            <GenerateAllButton projetos={projetos} />
          </>
        ) : (
          <>
            <h1>Nenhum certificado cadastrado.</h1>
          </>
        )}
      </div>
    </div>
  );
};

export { ListaProjetos };
