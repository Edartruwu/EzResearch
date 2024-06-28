"use server";
import { openai } from "@/lib/openai";
import { MainFormData } from "@/lib/validation/generateText";
import { ResearchPrisma } from "@/lib/prisma";

export default async function generateDocs(data: MainFormData): Promise<void> {
  try {
    const jsonData = JSON.stringify(data);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
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

    // Save the markdown content in the database using Prisma
    await ResearchPrisma.research.create({
      data: {
        name: data.titulo, // Replace with appropriate field
        author: data.author, // Replace with appropriate field
        text: markdownContent,
      },
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
