interface ListPageProps {
  projectIndex: number;
  setProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  projectCount: number;
}

export const ListPage = (props: ListPageProps) => {
  const { projectIndex, setProjectIndex, projectCount } = props;

  const updateProjectIndex = (indexIncrement: number) => {
    setProjectIndex(projectIndex + indexIncrement);
  };

  return projectCount > 1 ? (
    <div className="flex justify-between items-center flex-1 mt-8">
      <button
        disabled={projectIndex === 0}
        onClick={() => updateProjectIndex(-1)}
        className="py-2 w-1/3 bg-darkPrimary text-white text-sm md:text-lg font-bold self-center disabled:bg-primary disabled:opacity-25"
      >
        Anterior
      </button>
      <p className="text-center ">
        <span className="text-primary font-bold md:text-lg">
          {projectIndex + 1}
        </span>{" "}
        de {projectCount}
      </p>
      <button
        onClick={() => updateProjectIndex(1)}
        disabled={projectIndex + 1 === projectCount}
        className="py-2 w-1/3 bg-darkPrimary text-white text-sm md:text-lg font-bold self-center disabled:bg-primary disabled:opacity-25"
      >
        Próximo
      </button>
    </div>
  ) : (
    <></>
  );
};
