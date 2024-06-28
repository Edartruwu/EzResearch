/*
  Warnings:

  - You are about to drop the `createdPdf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "createdPdf";

-- CreateTable
CREATE TABLE "research" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "publishedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "research_pkey" PRIMARY KEY ("id")
);
