import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Pub from "@/components/research/pub";
import EditorData from "@/components/research/editorData";
import getDocsById from "@/server/docs/getDocs";

export default async function Page({
  params,
}: {
  params: { paperId: string };
}) {
  const { paperId } = params;
  console.log("Slug:", paperId); // Add this line to check the value of slug
  const data = await getDocsById(paperId);
  console.log(data?.text);
  if (!data) {
    return <div className="text-4xl">research not not found</div>;
  }

  return (
    <main>
      <Header />
      <EditorData name={data.author} publishedAt={data.publishedAt} />
      <Pub content={data.text} />
      <Footer />
    </main>
  );
}
