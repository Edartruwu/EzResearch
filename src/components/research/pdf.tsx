import { CardContent, Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface PdfProps {
  pdfList: { url: string }[];
}

const Pdf: React.FC<PdfProps> = ({ pdfList }) => {
  return (
    <>
      {pdfList.map((pdf, index) => (
        <Card key={index} className="flex items-center justify-center p-3">
          <CardContent>
            el pdf:{" "}
            <Button asChild variant={"link"}>
              <Link href={pdf.url}>ver el pdf</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Pdf;
