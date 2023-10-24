import download from "downloadjs";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import arquivoFonteRoboto from "../assets/Roboto-Regular.ttf";
import modeloCertificadoIncentivo from "../assets/Modelo Prêmio ABRIC de Incentivo à Ciência.pdf";
import modeloCertificadoExcelencia from "../assets/Modelo Prêmio ABRIC de Excelência em Pesquisa.pdf";
import { CertificationType, Projeto } from "../entities/Projeto";
import quebrarTexto from "./QuebrarTexto";

const TAMANHO_FONTE_TITULO = 32;
const ALTURA_MAXIMA_TITULO = 85;
const TAMANHO_FONTE_AUTORES = 18;
const TAMANHO_FONTE_DATA = 15;
const LARGURA_MAXIMA_TEXTO = 600;
const COR_TEXTO = rgb(0, 0.647, 0.169);

export const gerarCertificado = async (projeto: Projeto) => {
  let modelo: string = "";

  // lista de possíveis certificados a serem definidos
  switch (+projeto.tipoCertificado) {
    case CertificationType.Incentivo:
      modelo = modeloCertificadoIncentivo;
      break;
    case CertificationType.Excelencia:
      modelo = modeloCertificadoExcelencia;
      break;
  }

  const modeloCertificado = await fetch(modelo).then((res) =>
    res.arrayBuffer()
  );
  const fonteRoboto = await fetch(arquivoFonteRoboto).then((res) =>
    res.arrayBuffer()
  );

  const { nome, autores: a } = projeto;
  const autores = a.join(", ");

  const dataELocalEmissao =
    projeto?.dataEmissao?.toLocaleDateString("pt-BR", {
      day: "2-digit",
      year: "numeric",
      month: "long",
    }) + ", Novo Hamburgo/RS";

  const pdf = await PDFDocument.load(modeloCertificado);

  pdf.registerFontkit(fontkit);
  const fonte = await pdf.embedFont(fonteRoboto);

  const pdfPage = pdf.getPages()?.[0];
  const { width: larguraPdf } = pdfPage.getSize();

  let tamanhoFonteAutores = TAMANHO_FONTE_AUTORES + 1;
  let larguraAutores: number;

  // TODO: duas linhas para nomes dos autores
  do {
    tamanhoFonteAutores -= 1;
    larguraAutores = fonte.widthOfTextAtSize(autores, tamanhoFonteAutores);
  } while (larguraAutores > LARGURA_MAXIMA_TEXTO);

  const alturaLinhaAutores = fonte.heightAtSize(tamanhoFonteAutores);

  pdfPage.drawText(autores, {
    y: 252.5 - alturaLinhaAutores / 2,
    size: tamanhoFonteAutores,
    font: fonte,
    x: (larguraPdf - larguraAutores) / 2,
    color: COR_TEXTO,
  });

  const tituloProjeto = projeto.nome;
  let tamanhoFonteTitulo = TAMANHO_FONTE_TITULO + 1;
  let linhas: string[];
  let alturaLinhaTitulo: number;

  do {
    tamanhoFonteTitulo -= 1;
    alturaLinhaTitulo = fonte.heightAtSize(tamanhoFonteTitulo);
    linhas = quebrarTexto(
      tituloProjeto,
      fonte,
      tamanhoFonteTitulo,
      LARGURA_MAXIMA_TEXTO,
      ALTURA_MAXIMA_TITULO
    );
  } while (linhas.length * alturaLinhaTitulo > ALTURA_MAXIMA_TITULO);

  const alturaTextoQuebradoEmLinhas = linhas.length * alturaLinhaTitulo;
  linhas.forEach((linha, index) => {
    const larguraLinhaTitulo = fonte.widthOfTextAtSize(
      linha,
      tamanhoFonteTitulo
    );

    pdfPage.drawText(linha, {
      y:
        185 -
        (ALTURA_MAXIMA_TITULO - alturaTextoQuebradoEmLinhas) / 2 -
        index * alturaLinhaTitulo,
      size: tamanhoFonteTitulo,
      font: fonte,
      x: larguraPdf / 2 - larguraLinhaTitulo / 2,
      color: COR_TEXTO,
    });
  });

  const alturaLinhaData = fonte.heightAtSize(TAMANHO_FONTE_AUTORES);
  const larguraLinhaDataELocal = fonte.widthOfTextAtSize(
    dataELocalEmissao,
    TAMANHO_FONTE_DATA
  );

  pdfPage.drawText(dataELocalEmissao, {
    y: 27.5 - alturaLinhaData / 2,
    size: TAMANHO_FONTE_DATA,
    font: fonte,
    x: (larguraPdf - larguraLinhaDataELocal) / 2,
    color: rgb(1, 1, 1),
  });

  const pdfTitle = [
    `Certificado Prêmio ${CertificationType[projeto.tipoCertificado]}`,
    nome,
  ].join(" - ");
  pdf.setTitle(pdfTitle);
  pdf.setLanguage("pt-br");
  pdf.setAuthor("Associação Brasileira de Incentivo à Ciência");
  pdf.setCreator("Gerador de Certificados - ABRIC");
  pdf.setProducer("Gerador de Certificados - ABRIC");
  pdf.setKeywords(["Ciência", "Tecnologia", "Certificado", "Prêmio"]);
  pdf.setSubject("Certificado");

  const pdfBytes = await pdf.save();
  download(pdfBytes, `${pdfTitle}.pdf`, "application/pdf");
};
