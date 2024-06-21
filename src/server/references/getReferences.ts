"use server";

import { ResearchPrisma } from "@/lib/prisma";

export default async function GetReferences() {
  try {
    const references = await ResearchPrisma.textReference.findMany({
      // Include desired fields:
      select: { id: true, refName: true, textRef: true, globalRef: true },
    });

    return references;
  } catch (error) {
    console.error("Error fetching references:", error);
    // Handle errors gracefully, e.g., return an empty array or error object
    return []; // Or throw an appropriate error for client-side handling
  }
}
