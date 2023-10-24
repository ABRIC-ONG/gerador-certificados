interface DataEmissaoProps {
  dataEmissao: Date;
}
export const DataEmissao = (props: DataEmissaoProps) => {
  const { dataEmissao } = props;
  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl inline">
        Data de emissão:
      </h2>
      <p className="mb-6 overflow-hidden text-ellipsis text-lg py-1 lg:text-xl">
        {dataEmissao?.toLocaleDateString("pt-BR", {
          day: "numeric",
          year: "numeric",
          month: "long",
        })}
      </p>
    </>
  );
};
