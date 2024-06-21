"use server";

import { ResearchPrisma } from "@/lib/prisma";
import { RevistaData } from "@/lib/validation/references";
import { openai } from "@/lib/openai";

// Assuming ResearchPrisma is an instance of PrismaClient

export default async function getRevistaRef(
  data: RevistaData,
): Promise<string> {
  try {
    const jsonData = JSON.stringify(data);

    // Determine the message content based on the type of citation
    const systemMessageContent = (tipo: string) => {
      switch (tipo) {
        case "divulgacion_impresa":
          return "Eres un experto en la creación de citados de Apa7 para Revistas y tienes que responder con la citación correcta en Apa7 para citar un articulo de divulgación impresa el cual contiene el siguiente formato: Autor, A. (Fecha). Título del artículo. Título de la Revista. volumen (número), páginas del artículo. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "divulgacion_online":
          return "Eres un experto en la creación de citados de Apa7 para Revistas y tienes que responder con la citación correcta en Apa7 para citar un articulo de divulgación en línea el cual contiene el siguiente formato: Autor, A. (Fecha). Título del artículo. Título de la Revista. Recuperado de URL. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "numero_especial":
          return "Eres un experto en la creación de citados de Apa7 para Revistas y tienes que responder con la citación correcta en Apa7 para citar un articulo de un número especial el cual contiene el siguiente formato: Autor, A. (Fecha). Título del artículo. Título del número especial. Título de la Revista. volumen (número), páginas del artículo. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "revista_conDOI":
          return "Eres un experto en la creación de citados de Apa7 para Revistas y tienes que responder con la citación correcta en Apa7 para citar un articulo de revista con DOI el cual contiene el siguiente formato: Autor, A. (Fecha). Título del artículo. Título de la Revista. volumen (número), páginas del artículo. https://doi.org/xxxx Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "conDOIAnticipada":
          return "Eres un experto en la creación de citados de Apa7 para Revistas y tienes que responder con la citación correcta en Apa7 para citar un articulo de revista con DOI anticipada el cual contiene el siguiente formato: Autor, A. (Fecha). Título del artículo. Título de la Revista. Advance online publication. https://doi.org/xxxx Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "sinDoi":
          return "Eres un experto en la creación de citados de Apa7 para Revistas y tienes que responder con la citación correcta en Apa7 para citar un articulo de revista sin DOI el cual contiene el siguiente formato: Autor, A. (Fecha). Título del artículo. Título de la Revista. volumen (número), páginas del artículo. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        case "articuloEnLinea":
          return "Eres un experto en la creación de citados de Apa7 para Revistas y tienes que responder con la citación correcta en Apa7 para citar un articulo en línea el cual contiene el siguiente formato: Autor, A. (Fecha). Título del artículo. Título de la Revista. Recuperado de URL. Solo puedes responder con el formato lleno. utiliza los datos del json que te proporciona el usuario para hacer una cita perfecta. recuerda que solo puedes responder con la cita, no debes comentar nada al respecto.";
        default:
          throw new Error("Tipo de revista no reconocido.");
      }
    };

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessageContent(data.tipoRevista),
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
