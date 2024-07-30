import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import Provider from "@/lib/TanstackProvider";
import { getCatalog } from "@/actions/getCatalog";
import SearchModal from "@/components/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Figment Clique | Home",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Home',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { catalog } = await getCatalog();

  return (
    <html lang="en">                                                                                                        
      <body className={`${inter.className} relative h-auto bg-black`}>
        <Provider>
          <Navbar />
            <main className="bg-black font-poppins scroll-smooth pt-[100px] lg:pt-[200px]">
              {children}
            </main>
          <Footer />
          <Cart />
          <SearchModal catalog={catalog} />
        </Provider>
      </body>
    </html>
  );
}
