"use server";

import { ResearchPrisma } from "@/lib/prisma";

export default async function getDocsById(id: string) {
  const research = await ResearchPrisma.research.findUnique({
    where: {
      id,
    },
  });
  return research;
}
