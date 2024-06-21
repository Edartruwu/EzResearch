import ReferenceCard from "./references";
import GetReferences from "@/server/references/getReferences";

export default async function ReferenceCards() {
  const referencesData = await GetReferences();

  const formattedReferences = referencesData.map((data) => {
    let parsedGlobalRef = {};
    try {
      parsedGlobalRef = JSON.parse(data.globalRef);
    } catch (error) {
      console.error("Error parsing globalRef:", error);
    }

    return {
      id: data.id,
      textRef: data.textRef,
      titulo: (parsedGlobalRef as { titulo?: string }).titulo, // Type assertion
    };
  });

  return (
    <div className="flex flex-col gap-6 items-center justify-center max-w-[800px]">
      {formattedReferences.map((data) => (
        <ReferenceCard
          key={data.id}
          title={data.titulo || "No Title Available"} // Fallback if titulo is undefined
          reference={data.textRef}
        />
      ))}
    </div>
  );
}
