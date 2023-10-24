interface NomeProjetoProps {
  nomeProjeto: string;
}
export const NomeProjeto = (props: NomeProjetoProps) => {
  const { nomeProjeto } = props;
  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl">
        Nome do Projeto
      </h2>
      <p className="mb-2 overflow-hidden text-ellipsis text-lg py-1 lg:text-xl">
        {nomeProjeto}
      </p>
    </>
  );
};
