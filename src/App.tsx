import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Formulario } from "./components/Formulario";
import { ListaProjetos } from "./components/ListaProjetos";
import { Projeto } from "./entities/Projeto";

function App() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center mb-4 md:mb-0 md:min-h-screen md:justify-evenly lg:w-screen lg:flex-row">
        <Formulario setProjetos={setProjetos} projetos={projetos} />
        <ListaProjetos projetos={projetos} />
      </main>
    </>
  );
}

export default App;
