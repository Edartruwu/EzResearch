"use server";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import PDFDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";
import { openai } from "@/lib/openai";
import { MainFormData } from "@/lib/validation/generateText";
import { visit } from "unist-util-visit";
import { ResearchPrisma } from "@/lib/prisma";

const writeFile = promisify(fs.writeFile);

// Function to process markdown text and convert to HTML
async function processMarkdown(markdownText: string): Promise<string> {
  const processedMarkdown = await remark()
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdownText);
  return processedMarkdown.toString();
}

// Function to convert markdown to LaTeX string
async function generateLatexString(markdownText: string): Promise<string> {
  const tree = remark().use(remarkParse).parse(markdownText);

  let latexString = "";

  visit(tree, (node: any) => {
    if (node.type === "text") {
      latexString += node.value;
    } else if (node.type === "emphasis") {
      latexString += `\\emph{${(node.children[0] as any).value}}`;
    } else if (node.type === "link") {
      latexString += `\\href{${node.url}}{${(node.children[0] as any).value}}`;
    }
    // Add conversion logic for other markdown elements as needed
  });

  return latexString;
}

// Function to ensure a directory exists
function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

// Function to generate a PDF from LaTeX string
async function generatePDF(
  latexString: string,
  outputPath: string,
): Promise<void> {
  ensureDirectoryExistence(outputPath);

  // Path to the Helvetica.afm file in the public directory
  const helveticaPath = path.join(process.cwd(), "public", "Helvetica.afm");

  if (!fs.existsSync(helveticaPath)) {
    throw new Error(`Font file not found: ${helveticaPath}`);
  }

  const doc = new PDFDocument();
  doc.registerFont("Helvetica", helveticaPath);

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Set the font before calling text
  doc.font("Helvetica");

  doc.fontSize(12).text(latexString, {
    width: 410,
    align: "left",
  });

  doc.end();

  return new Promise<void>((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

// Main function to get docs, generate PDF and save it
export default async function getDocs(data: MainFormData): Promise<void> {
  try {
    const jsonData = JSON.stringify(data);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `
          Eres un experto en la creación de documentos producto de una investigación exhaustiva. El usuario te brindará información para que armes un documento de investigación completo. Los documentos de investigación deben incluir los siguientes elementos:
          
          1. **Título**: El título de la investigación.
          2. **Mapa Numérico**: Un esquema numerado que define el orden de los datos y subtítulos a seguir.
          3. **Cuerpo del Documento**: El contenido de la investigación, modificado solo para mejorar su fluidez y disfrute para el lector.
          4. **Citas**: Referencias recibidas que deberán ser colocadas en el orden según el mapa numérico.
          
          Instrucciones específicas:
          - Solo puedes responder en formato Markdown.
          - Solo incluir el contenido de la investigación proporcionado por el usuario.
          - Mantener la integridad de los datos proporcionados.
          - Las citas tienen que estar en el formato perfecto de APA7 en sangría francesa.
          
          Recuerda, tu tarea principal es organizar y refinar el contenido para hacerlo más disfrutable, sin alterar la integridad de los datos proporcionados.
          `,
        },
        { role: "user", content: jsonData },
      ],
    });

    if (!completion.choices || !completion.choices[0].message) {
      throw new Error("Invalid API response");
    }
    const markdownContent: string = completion.choices[0].message.content ?? ""; // Ensure it's a string
    const latexContent = await generateLatexString(markdownContent);

    // Update the output path to store it in /public
    const fileName = `output-${uuidv4()}.pdf`;
    const outputPath = path.join(process.cwd(), "public", fileName);
    await generatePDF(latexContent, outputPath);

    // Save the PDF location in the database using Prisma
    await ResearchPrisma.createdPdf.create({
      data: {
        src: `/${fileName}`, // Relative path
        name: fileName,
      },
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
