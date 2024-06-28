"use server";

import { ResearchPrisma } from "@/lib/prisma";

export default async function getAllDocs() {
  try {
    const researchData = await ResearchPrisma.research.findMany({
      orderBy: { publishedAt: "desc" }, // Order by publishedAt from newer to older
    });

    return researchData; // Return all fields of the research data
  } catch (error) {
    console.error("Error fetching research data:", error);
    throw error; // Re-throw the error to be handled elsewhere if needed
  } finally {
    await ResearchPrisma.$disconnect(); // Disconnect from the database
  }
}
