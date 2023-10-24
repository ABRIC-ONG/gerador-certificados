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

interface ListProps {
  projetos: Projeto[];
}

const initialPeopleIndex = 0;

const ListaProjetos = (props: ListProps) => {
  const { projetos: people } = props;
  const [personIndex, setPersonIndex] = useState<number>(initialPeopleIndex);
  const [selectedPerson, setSelectedPerson] = useState<Projeto>(
    people[initialPeopleIndex]
  );

  useEffect(() => {
    const newIndex = people.length - 1;
    setPersonIndex(newIndex);
    setSelectedPerson(people[newIndex]);
  }, [people]);

  useEffect(() => {
    setSelectedPerson(people[personIndex]);
  }, [personIndex]);

  return (
    <div className="flex flex-col items-center w-full max-w-xl lg:w-1/2 lg:max-w-3xl">
      <h2 className="font-bold text-xl mb-4 lg:text-3xl">
        {people.length} certificado{isPlural(people.length) && "s"} cadastrado
        {isPlural(people.length) && "s"}
      </h2>
      <div className="p-4 flex flex-col text-lg w-[90%] bg-gray-200">
        {people?.length > 0 ? (
          <>
            <NomeProjeto nomeProjeto={selectedPerson?.nome} />
            <Autores autores={selectedPerson?.autores || []} />
            <DataEmissao dataEmissao={selectedPerson?.dataEmissao} />
            <TipoCertificado
              tipoCertificado={selectedPerson?.tipoCertificado}
            />
            <ListPage
              projectIndex={personIndex}
              setProjectIndex={setPersonIndex}
              projectCount={people.length ?? 0}
            />
            <BotaoGerar projetoSelecionado={selectedPerson} />
            <GenerateAllButton projetos={people} />
          </>
        ) : (
          <>
            <h1>Nenhuma pessoa cadastrada.</h1>
          </>
        )}
      </div>
    </div>
  );
};

export { ListaProjetos };
