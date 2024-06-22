import { ResearchPrisma } from "@/lib/prisma";

export default async function getDocs() {
  try {
    const pdfs = await ResearchPrisma.createdPdf.findMany();
    return pdfs;
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return []; // Return an empty array or handle it as you prefer
  }
}
