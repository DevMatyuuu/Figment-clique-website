import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import SearchModal from "@/components/SearchModal";
import Provider from "@/lib/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Figment Clique | Home",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Home',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">                                                                                                        
      <body className={`${inter.className} relative h-auto`}>
        <Provider>
          <Navbar />
            <main className="bg-white text-black font-poppins scroll-smooth pt-[97px] lg:pt-[200px] ">
              {children}
            </main>
          <Footer />
          <Cart />
          <SearchModal />
        </Provider>
      </body>
    </html>
  );
}