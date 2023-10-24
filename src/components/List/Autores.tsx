import { isPlural } from "../../utils/IsPlural";

interface AutoresProps {
  autores: string[];
}
export const Autores = (props: AutoresProps) => {
  const { autores } = props;

  return (
    <>
      <h2 className="text-primary font-bold text-lg lg:text-xl">
        Autor{isPlural(autores.length) && "es"}
      </h2>
      <ul className="mb-4">
        {autores?.map((autor, index) => (
          <li
            className="overflow-hidden text-ellipsis text-lg py-1 lg:text-xl"
            key={index}
          >
            {index + 1}. {autor}
          </li>
        ))}
      </ul>
    </>
  );
};
