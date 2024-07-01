import Image from "next/image";
import { getCatalog } from "./data";

export default async function Catalog() {
  const catalogList = await getCatalog()
  "use client"
  return (
    <div className="flex flex-col container mx-auto h-auto max-w-[1070px] px-5 py-20 gap-10">
      <h1 className="text-white text-4xl">Catalog</h1>
      <div className="grid grid-cols-4 justify-between gap-5 h-full w-full overflow-hidden">
        {catalogList.map((catalog) => (
          <div key={catalog._id._bsontype} className="flex flex-col w-full justify-center items-center bg-white text-black rounded-xl group cursor-pointer">
            <Image src={catalog.image} alt={catalog.title} width='150' height='200' className="rounded-xl w-[250px] h-full object-cover  group-hover:scale-105 duration-500 cursor-pointer"/>
            <h1 className="text-lg z-40" data-aos='fade-up'>{catalog.title}</h1>
            <h1 className="text-lg" data-aos='fade-up'>{catalog.price}</h1>
          </div>
        ))}
     </div>
    </div>
  );
}
