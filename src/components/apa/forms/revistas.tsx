"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { CalendarIcon } from "@radix-ui/react-icons";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";

import { RevistaSchema } from "@/lib/validation/references";

import getRevistaRef from "@/server/references/getRevistaRef";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function RevistasForm() {
  const form = useForm<z.infer<typeof RevistaSchema>>({
    resolver: zodResolver(RevistaSchema),
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof RevistaSchema>) {
    if (!values) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        title: "Tu cita en Apa7 sobre una revista será generada",
        description: "Podrás verla en el apartado de referencias!",
      });
    }

    const response = await getRevistaRef(values);
    console.log(response);
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cita una Revista con Apa7</CardTitle>
        <CardDescription>
          Llena todos los campos para generar una cita válida en Apa7
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el título de la revista o articulo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autores"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autores</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa los autores de la revista o articulo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de publicación</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full md:w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Elige una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="editorial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Editorial</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el nombre de la editorial"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volumen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volumen</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el volumen (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emisión</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa la emisión (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paginas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Páginas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el rango de páginas (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOI</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa el DOI (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa la URL (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idioma"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idioma</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elige un idioma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ingles">Inglés</SelectItem>
                        <SelectItem value="español">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoRevista"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cita</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elije el tipo de cita" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="divulgacion_impresa">
                          Artículo de revista de divulgación impresa
                        </SelectItem>
                        <SelectItem value="divulgacion_online">
                          Artículo de revista de divulgación en línea
                        </SelectItem>
                        <SelectItem value="numero_especial">
                          Artículo de revista en un número especial
                        </SelectItem>
                        <SelectItem value="revista_conDOI">
                          Artículo de revista con DOI
                        </SelectItem>
                        <SelectItem value="conDOIAnticipada">
                          Artículo de revista con DOI, publicación anticipada en
                          línea
                        </SelectItem>
                        <SelectItem value="sinDoi">
                          Artículo de revista sin DOI en línea
                        </SelectItem>
                        <SelectItem value="articuloEnLiea">
                          Artículo de periódico en línea
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full flex justify-center items-center">
              <Button type="submit">
                Generar cita en Apa7 para una Revista
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
