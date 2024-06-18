import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Main from "@/components/landing/main";
export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-black text-white">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
