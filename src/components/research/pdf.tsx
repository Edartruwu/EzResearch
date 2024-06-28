import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface PDFparams {
  name: string;
  author: string;
  id: string;
}

export default function Pdf({ name, author, id }: PDFparams) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-2 m-2">
        <CardTitle>{name}</CardTitle>
        <div className="flex flex-col gap-1">
          <p>Hecho por: {author}</p>
        </div>
        <Button asChild>
          <Link prefetch={true} href={`/research/${id}`}>
            Descubre esta investigación
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
