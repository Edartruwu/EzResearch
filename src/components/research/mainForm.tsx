"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mainForm } from "@/lib/validation/generateText";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import generateDocs from "@/server/docs/pdfgen";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
export default function MainForm() {
  const form = useForm<z.infer<typeof mainForm>>({
    resolver: zodResolver(mainForm),
  });
  const { toast } = useToast();
  async function onSubmit(values: z.infer<typeof mainForm>) {
    toast({
      title: "Tu pdf ha sido generado correctamente",
      description: "disfruta tu investigación!",
    });
    revalidatePath("/research");

    await generateDocs(values);
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingresa el titulo de tu investigación aquí</FormLabel>
              <FormControl>
                <Input placeholder="Titulo..." {...field} />
              </FormControl>
              <FormDescription>
                Un buen titulo es escencial para cualquier investigación!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingresa tu nombre aquí</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre..." {...field} />
              </FormControl>
              <FormDescription>
                Este articulo será publicado a tu nombre :)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mapa_numerico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Aquí va el mapa numerico de tu investigación
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="texto en bruto"
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormDescription>
                Es necesario que sea lo más descriptivo posible ya que este
                determinará la estructura y organización de tu investigación.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="texto_bruto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Aquí va el texto en bruto de tu investigación
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="texto en bruto"
                  {...field}
                  className="min-h-[300px]"
                />
              </FormControl>
              <FormDescription>
                Es necesario que lo llenes con citaciones y fuentes de calidad
                que hayas encontrado en tu proposito, tus citas tienen que ir al
                ultimo del texto, por el momento no admitimos imagenes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generar Pdf con la Investigación</Button>
      </form>
    </Form>
  );
}
