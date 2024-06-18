import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Apa() {
  return (
    <div>
      <div className="flex flex-col gap-12 items-center justify-center">
        <p className="text-3xl font-semibold">
          Obtén aquí las referencias que necesitas en Apa7
        </p>

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="libro">Libro</TabsTrigger>
            <TabsTrigger value="tesis">Tesis</TabsTrigger>
            <TabsTrigger value="revista">Revista</TabsTrigger>
          </TabsList>
          <TabsContent value="libro">
            <Card>
              <CardHeader>
                <CardTitle>Cita un libro con Apa7</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Genera la citación</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="tesis">
            <Card>
              <CardHeader>
                <CardTitle>Cita una tesis con Apa7</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current</Label>
                  <Input id="current" type="text" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New</Label>
                  <Input id="new" type="text" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Genera la citación</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="revista">
            <Card>
              <CardHeader>
                <CardTitle>Cita una revista con Apa7</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Genera la Citación</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
