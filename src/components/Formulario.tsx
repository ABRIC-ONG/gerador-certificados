import { useState } from "react";
import { Projeto as Projeto, TipoDeCertificado } from "../entities/Projeto";
import { isPlural } from "../utils/IsPlural";

interface FormularioProps {
  setProjetos: React.Dispatch<React.SetStateAction<Projeto[]>>;
  projetos: Projeto[];
}

const projetoInicial: Projeto = {
  nome: "",
  dataEmissao: new Date(),
  tipoCertificado: TipoDeCertificado.Incentivo,
  autores: [],
};
const nomeAutorInicial = "";

const Formulario = (props: FormularioProps) => {
  const [projeto, setProjeto] = useState<Projeto>(projetoInicial);
  const [nomeAutor, setNomeAutor] = useState<string>(nomeAutorInicial);

  const data: () => string = () => {
    const data = projeto.dataEmissao;
    const dataString =
      data.getFullYear() +
      "-" +
      ("0" + (data.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + data.getDate()).slice(-2);
    return dataString;
  };

  const adicionarProjeto = () => {
    props.setProjetos([...props.projetos, projeto]);
    setProjeto({
      ...projetoInicial,
      dataEmissao: projeto.dataEmissao,
      tipoCertificado: projeto.tipoCertificado,
      autores: [],
    });
  };

  const adicionarAutor = () => {
    if (nomeAutor) projeto.autores.push(nomeAutor);
    setNomeAutor(nomeAutorInicial);
  };

  const removerAutor = (index: number) => {
    let autores = projeto.autores;
    autores = autores.filter((autor) => autor !== projeto.autores[index]);
    setProjeto({ ...projeto, autores });
  };

  return (
    <form className="flex flex-col items-left py-4 w-[90%] max-w-sm mb-">
      <h1 className="text-2xl self-center mb-6 font-bold text-primary lg:text-3xl">
        Dados do Certificado
      </h1>
      <label
        htmlFor="name"
        className="text-primary font-semibold text-lg md:text-xl"
      >
        Nome completo
      </label>
      <input
        id="name"
        className="appearance-none border bg-gray-100 p-2 focus:bg-white focus:outline-darkPrimary mb-4 md:text-xl resize-y"
        placeholder="Nome do Projeto"
        value={projeto.nome}
        onChange={(e) =>
          setProjeto({ ...projeto, nome: e.currentTarget.value })
        }
      />
      {projeto.autores.length > 0 && (
        <>
          <label className="text-primary font-semibold text-lg md:text-xl">
            Autor{isPlural(projeto?.autores?.length) && "es"}
          </label>
          <ul className="md:mb-4">
            {projeto.autores.map((autor, index) => {
              return (
                <li key={index} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => removerAutor(index)}
                    className="text-red-400 font-bold text-xl p-1"
                  >
                    X
                  </button>
                  <span className="inline-block md:text-xl max-w-full overflow-hidden text-ellipsis">
                    {autor}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <label className="text-primary font-semibold text-lg md:text-xl">
        Nome do autor
      </label>
      <div className="mb-4 flex">
        <input
          className="flex-[5] appearance-none border bg-gray-100 p-2 md:text-xl focus:bg-white focus:outline-darkPrimary"
          placeholder="Nome do autor"
          value={nomeAutor}
          onChange={(e) => setNomeAutor(e.currentTarget.value)}
        />
        <button
          type="button"
          onClick={adicionarAutor}
          className="flex-[2] text-white bg-primary font-bold"
        >
          Adicionar
        </button>
      </div>

      <label
        htmlFor="type"
        className="text-primary font-semibold text-lg md:text-xl"
      >
        Tipo de certificado
      </label>
      <select
        id="type"
        name="type"
        className="mb-4 flex border bg-gray-100 p-2 md:text-xl focus:bg-white focus:outline-darkPrimary"
        value={projeto.tipoCertificado}
        onChange={(e) =>
          setProjeto({
            ...projeto,
            tipoCertificado: e.currentTarget
              .value as unknown as TipoDeCertificado,
          })
        }
      >
        <option value={TipoDeCertificado.Incentivo}>
          {TipoDeCertificado.Incentivo}
        </option>
        <option value={TipoDeCertificado.Excelencia}>
          {TipoDeCertificado.Excelencia}
        </option>
      </select>

      <label
        htmlFor="dataEmissao"
        className="text-primary font-semibold text-lg md:text-xl"
      >
        Data de emissão
      </label>
      <input
        id="dataEmissao"
        type="date"
        value={data()}
        onChange={(e) => {
          const dateInput = e.currentTarget.value; // yyyy-mm-dd string format from date input
          let dateParts = dateInput.split("-").map(Number); // split date values
          dateParts[1]--; // fix the current month to use as index of month in Date constructor
          setProjeto({
            ...projeto,
            dataEmissao: new Date(dateParts[0], dateParts[1], dateParts[2]),
          });
        }}
        className="mb-4 flex appearance-none border bg-gray-100 p-2 md:text-xl focus:bg-white focus:outline-darkPrimary"
      />
      <button
        type="button"
        onClick={adicionarProjeto}
        disabled={
          !projeto?.nome ||
          !projeto?.dataEmissao ||
          projeto?.autores?.length < 1
        }
        className="px-16 text-white bg-primary font-bold py-2  md:text-xl disabled:opacity-75 md:py-4"
      >
        Adicionar certificado
      </button>
    </form>
  );
};

export { Formulario };
