"use server";

import { ResearchPrisma } from "@/lib/prisma";
import { TesisData } from "@/lib/validation/references";
import { openai } from "@/lib/openai";

export default async function getLibroRef(data: TesisData): Promise<string> {
  try {
    const jsonData = JSON.stringify(data);
    // Determine the message content based on the type of citation
    const systemMessageContent = (tipo: string) => {
      switch (tipo) {
        case "inedita":
          return "Eres un experto en la creación de citados de Apa7 para Tesis y tienes que responder con la citación correcta en Apa7 para citar una Tesis inedita el cual contiene el siguiente formato: Autor, A. (Año). Título de la tesis [Tipo de tesis para optar un grado o título inédita]. Nombre de la institución que otorga el título. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "repositorio":
          return "Eres un experto en la creación de citados de Apa7 para Tesis y tienes que responder con la citación correcta en Apa7 para citar una Tesis disponible en un repositorio académico el cual contiene el siguiente formato: Autor, A. (Año). Título de la tesis [Tipo de tesis para optar un grado o título, Nombre de la institución que otorga el título]. Nombre del Repositorio. http://www.repositorio.abc Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "comercial":
          return "Eres un experto en la creación de citados de Apa7 para Tesis y tienes que responder con la citación correcta en Apa7 para citar una Tesis disponible en una base de datos comercial la cual tiene el siguiente formato: Autor, A. (Año). Título de la tesis (Acceso o Solicitud No.) [Tipo de tesis para optar un grado o título, Nombre de la institución que otorga el título]. Nombre de la base de datos.  Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        default:
          throw new Error("Tipo de revista no reconocido.");
      }
    };

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessageContent(data.tesisType),
        },
        { role: "user", content: jsonData },
      ],
      model: "gpt-4o",
    });

    // Check if choices and message content exist
    if (
      completion.choices &&
      completion.choices[0].message &&
      completion.choices[0].message.content
    ) {
      const responseContent = completion.choices[0].message.content.trim();

      console.log(responseContent);

      // Save to database using Prisma
      await ResearchPrisma.textReference.create({
        data: {
          refName: data.titulo, // Adjust this based on your actual data structure
          textRef: responseContent, // The generated citation
          globalRef: jsonData, // Original data in JSON format or adjust as needed
        },
      });

      return responseContent;
    } else {
      throw new Error("Invalid response structure from OpenAI.");
    }
  } catch (error) {
    console.error("Error generating Apa7 citation:", error);
    return ""; // Return empty string on error
  }
}
