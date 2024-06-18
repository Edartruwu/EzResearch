import Link from "next/link";
import Image from "next/image";
export default function Main() {
  return (
    <main className="flex-1 container px-4 md:px-6 py-12 md:py-24 lg:py-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Revoluciona tu research workflow
        </h1>
        <p className="text-gray-300 max-w-[600px]">
          Supercarga tu flujo de trabajo de investigación con EzResearchAI.
          Genera citas APA 7 impecables, organiza tu investigación sin
          problemas, mejora tu escritura y analiza datos con el poder de la IA.
        </p>
        <div className="flex gap-4">
          <Link
            href="/research"
            className="inline-flex h-10 items-center justify-center rounded-md bg-white text-black px-6 text-sm font-medium shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            prefetch={true}
          >
            Organiza tu investigación
          </Link>
          <Link
            href="/apa"
            className="inline-flex h-10 items-center justify-center rounded-md border border-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            prefetch={true}
          >
            Citado Apa7
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="/research.png"
          width={400}
          height={400}
          alt="apa7"
          priority={true}
          className="max-w-[300px] md:max-w-full"
        />
      </div>
    </main>
  );
}
