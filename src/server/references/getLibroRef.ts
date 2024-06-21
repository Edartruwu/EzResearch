"use server";

import { ResearchPrisma } from "@/lib/prisma";
import { BookData } from "@/lib/validation/references";
import { openai } from "@/lib/openai";

export default async function getLibroRef(data: BookData): Promise<string> {
  try {
    const jsonData = JSON.stringify(data);
    // Determine the message content based on the type of citation
    const systemMessageContent = (tipo: string) => {
      switch (tipo) {
        case "libro_impreso":
          return "Eres un experto en la creación de citados de Apa7 para Libros y tienes que responder con la citación correcta en Apa7 para citar un Libro Impreso el cual contiene el siguiente formato: Autor, A., Autor, B., & Autor, C. (Año). Título del Libro. Editorial. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "libro_editores":
          return "Eres un experto en la creación de citados de Apa7 para Libros y tienes que responder con la citación correcta en Apa7 para citar un Libro con Editor(es) el cual contiene el siguiente formato: Editor, A., Editor, B., & Editor, C. Abreviatura de editor (Ed.) o editores (Eds.). (año). Título del libro. Editorial. Recuperado de URL. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "libro_online":
          return "Eres un experto en la creación de citados de Apa7 para Libros y tienes que responder con la citación correcta en Apa7 para citar un Libro en linea el cual contiene el siguiente formato: Autor, A., Autor, B., & Autor, C. (Año). Título del Libro. Editorial. http://www.ejemplo.abc Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "libroDOI":
          return "Eres un experto en la creación de citados de Apa7 para Libros y tienes que responder con la citación correcta en Apa7 para citar un Libro con DOI el cual contiene el siguiente formato: Autor, A., Autor, B., & Autor, C. (Año). Título del libro. Editorial. https://doi.org/ Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "capitulo_libro":
          return "Eres un experto en la creación de citados de Apa7 para Libros y tienes que responder con la citación correcta en Apa7 para citar un Capitulo de libro el cual contiene el siguiente formato: Autor del capítulo, A. (Año). Título del capítulo. En A. Editor del libro Abreviatura de editor (Ed.) o editores (Eds.), Título del libro (páginas del capítulo pp.). Editorial. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "audio_libro":
          return "Eres un experto en la creación de citados de Apa7 para Libros y tienes que responder con la citación correcta en Apa7 para citar un Audiolibro el cual contiene el siguiente formato: Autor, A. (Año). Título del libro (A. Autor, Trad.; A. Autor, Narr.) [Audiolibro]. Editorial. http://www.ejemplo.abc Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "enciclopediaodick":
          return "Eres un experto en la creación de citados de Apa7 para Libros y tienes que responder con la citación correcta en Apa7 para citar un Diccionario o enciclopedia en línea el cual contiene el siguiente formato: Autor, A. (s.f.). Título. Recuperado el día de mes de año, de http://www.ejemplo.abc Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        default:
          throw new Error("Tipo de revista no reconocido.");
      }
    };

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessageContent(data.tipo_libro),
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
