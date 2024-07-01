import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Figment Clique | Home",
  description: "Figment Clique is a Clothing Brand based in the philippines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
          <main className="lg:pt-[185px] pt-[130px] bg-black font-poppins scroll-smooth">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
