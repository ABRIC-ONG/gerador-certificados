import { PDFFont } from "pdf-lib";

export default function quebrarTexto(
  texto: string,
  fonte: PDFFont,
  tamanhoFonte: number,
  larguraMaxima: number,
  alturaMaxima: number
): string[] {
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

  const paragrafos = resultado.split("\n");

  fonte.heightAtSize(tamanhoFonte);

  if (paragrafos.length * fonte.heightAtSize(tamanhoFonte) > alturaMaxima)
    return quebrarTexto(
      texto,
      fonte,
      tamanhoFonte - 1,
      larguraMaxima,
      alturaMaxima
    );
  else return paragrafos;
}
