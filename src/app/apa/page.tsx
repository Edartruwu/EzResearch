import Apa from "@/components/apa/apamaker";
import ReferenceCards from "@/components/apa/referenceCards";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export const revalidate = 600;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <Header />
      <div className="flex flex-col gap-12 items-center justify-center my-12">
        <Apa />
        <ReferenceCards />
      </div>
      <Footer />
    </main>
  );
}
