import { PDFFont } from "pdf-lib";

export default function quebrarTexto(
  texto: string,
  fonte: PDFFont,
  tamanhoFonte: number,
  larguraMaxima: number,
  alturaMaxima: number
): [string[], number] {
  do {
    const palavras = texto.split(" ");
    let linha = "";
    let resultado = "";
    for (let n = 0; n < palavras.length; n++) {
      const linhaTeste = linha + palavras[n] + " ";
      const larguraTeste = fonte.widthOfTextAtSize(linhaTeste, tamanhoFonte);
      if (larguraTeste > larguraMaxima) {
        resultado += linha + "\n";
        linha = palavras[n] + " ";
      } else {
        linha = linhaTeste;
      }
    }
    resultado += linha;

    const linhas = resultado.split("\n");

    const alturaTextoQuebradoEmLinhas =
      linhas.length * fonte.heightAtSize(tamanhoFonte);

    if (alturaTextoQuebradoEmLinhas > alturaMaxima)
      return quebrarTexto(
        texto,
        fonte,
        --tamanhoFonte,
        larguraMaxima,
        alturaMaxima
      );
    else return [linhas, tamanhoFonte];
  } while (tamanhoFonte > 0);
}
