import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LibrosForm from "./forms/libros";
import TesisForm from "./forms/tesis";
import RevistasForm from "./forms/revistas";

export default function Apa() {
  return (
    <div>
      <div className="flex flex-col gap-12 items-center justify-center">
        <p className="text-3xl font-semibold">
          Obtén aquí las referencias que necesitas en Apa7
        </p>
        <Tabs defaultValue="libro" className="">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="libro">Libro</TabsTrigger>
            <TabsTrigger value="tesis">Tesis</TabsTrigger>
            <TabsTrigger value="revista">Revista</TabsTrigger>
          </TabsList>
          <TabsContent value="libro">
            <LibrosForm />
          </TabsContent>
          <TabsContent value="tesis">
            <TesisForm />
          </TabsContent>
          <TabsContent value="revista">
            <RevistasForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
