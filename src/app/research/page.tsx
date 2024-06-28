import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import MainForm from "@/components/research/mainForm";
import Pdfs from "@/components/research/pdfs";
export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <Header />
      <div className="flex flex-col gap-12 items-center justify-center my-12">
        <MainForm />
        <Pdfs />
      </div>
      <Footer />
    </main>
  );
}
