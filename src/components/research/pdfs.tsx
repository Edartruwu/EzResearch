import getDocs from "@/server/docs/getDocs";
import Pdf from "./pdf";

export default async function Pdfs() {
  const pdfList = await getDocs();
  return (
    <div className="flex flex-col gap-4">
      <Pdf pdfList={pdfList.map((doc) => ({ url: doc.src }))} />
    </div>
  );
}
