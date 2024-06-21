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

// Define the schema using zod
const formSchema = z.object({
  titulo: z.string().trim().min(1, { message: "Título is required" }),
  autores: z
    .string()
    .trim()
    .min(1, { message: "Autores is required" })
    .refine(
      (val) => val.split(",").every((author) => author.trim().length > 0),
      { message: "Each author name must be separated by commas and non-empty" },
    ),
  fecha: z.date(),
  universidad: z
    .string()
    .trim()
    .min(1, { message: "El nombre de la universidad es requerido" }),
  lugar_universidad: z
    .string()
    .trim()
    .min(1, { message: "El lugar de la universidad es requerido" }),
  doi: z.string().trim().url().optional(), // Validate URL format if optional
  url: z.string().trim().url().optional(), // Validate URL format if optional
  idioma: z.enum(["español", "ingles"]).optional(), // Use array for enum values
});

export default function TesisForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // server action logic called here
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cita una Tesis con Apa7</CardTitle>
        <CardDescription>
          Llena todos los campos para generar una cita valida en Apa7
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
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el titulo del libro"
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
                      placeholder="Ingresa los autores del libro"
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
                              <span>Pick a date</span>
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
              name="universidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Universidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el nombre de la universidad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lugar_universidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lugar de la universidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el lugar de la universidad"
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
                          <SelectValue placeholder="Elije un idioma para para la tesis" />
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
            <div className="col-span-full flex justify-center items-center">
              <Button type="submit">Generar cita en Apa7 para una Tesis</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
