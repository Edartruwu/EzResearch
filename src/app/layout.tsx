import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Effortless Research with EzResearchAI: Your All-in-One Tool",
  description:
    "Supercharge your research workflow with EzResearchAI. Generate flawless APA 7 citations, organize your research seamlessly, improve your writing, and analyze data with the power of AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <main> {children} </main>
        <Toaster />
      </body>
    </html>
  );
}
