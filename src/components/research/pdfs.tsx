import Pdf from "./pdf";
import getAllDocs from "@/server/docs/getAllDocs";

export default async function Pdfs() {
  const data = await getAllDocs();
  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <Pdf key={item.id} name={item.name} author={item.author} id={item.id} />
      ))}
    </div>
  );
}
