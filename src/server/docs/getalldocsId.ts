"use server";

import { ResearchPrisma } from "@/lib/prisma";

export default async function getAllDocsId() {
  const ids = await ResearchPrisma.research.findMany({
    select: {
      id: true,
    },
  });
  return ids.map((research) => research.id);
}
