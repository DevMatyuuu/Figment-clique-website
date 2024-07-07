import { Metadata } from "next";
import CatalogItems from "@/components/CatalogItems";

export const metadata: Metadata = {
  title: "Figment Clique | Catalog",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Catalog',
  },
};

export default async function Catalog() {

  return (
    <div className='flex flex-col container mx-auto h-auto max-w-[1070px] pt-[130px] lg:pt-[250px] px-5 py-20 gap-10'>
      <h1 className="text-white text-4xl">Catalog</h1>
      <CatalogItems />
    </div>
  );
}
