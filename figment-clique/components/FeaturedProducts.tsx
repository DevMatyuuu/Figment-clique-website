'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import useFetchCatalog from '@/hooks/useFetchCatalog';
import useFetchStocks from '@/hooks/useFetchStocks';

const FeaturedProducts = () => { 
  const {data: catalogData, error: catalogError, isLoading: isCatalogLoading} = useFetchCatalog();
  const {data: stocksData, error: stocksError, isLoading: isStocksLoading} = useFetchStocks();
  const [hoveredId, setHoveredId] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  })

  const seeProduct = (title: string) => {
    router.push(`/catalog/${title}`)
  }

  if (isCatalogLoading) return <p>Loading...</p>;
  if (!catalogData || catalogData.length === 0) return <p>No catalog data available</p>;

  return (
    <div className="w-full bg-white pt-10 h-auto z-50">
      <div className="text-black flex flex-col container mx-auto max-w-[1070px] px-5">
        <h1 className="lg:text-3xl text-xl">Featured Products</h1>
        <div className='relative grid grid-cols-2 lg:gap-10 gap-5 lg:py-10 py-10'>
          {catalogData.map((featured) => {
            const stockEntry = stocksData?.find((stock) => stock.catalogTitle === featured.title);
            const isOutOfStock = 
              stockEntry?.small as number === 0 &&
              stockEntry?.medium as number === 0 &&
              stockEntry?.large as number === 0 &&
              stockEntry?.xl as number === 0 &&
              stockEntry?.xxl as number === 0

            return(
            <>
            <div className='relative flex flex-col'>
              <div onClick={() => seeProduct(featured.title)} data-aos="fade-up" className='lg:hidden flex flex-col h-max w-full group hover:shadow-2xl lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
                <div className='h-full w-full rounded-t-lg overflow-hidden duration-500'>
                  <Image src={featured.image} width="200" height="500" alt="tee" className='w-full h-[180px] ease-in-out transition-all duration-500' loading='lazy'/>
                </div>
                <div className='flex flex-col text-center justify-center items-center gap-2 py-4 px-7 lg:px-0'>
                  <h2 className='text-xs lg:text-base'>{featured.title}</h2>
                  <span className='text-xs lg:text-sm text-black/50'>Figment Clique</span>
                  <span className='text-base lg:text-xl'>₱{featured.price}</span>
                </div>
              </div>
              <div onClick={() => seeProduct(featured.title)} onMouseEnter={() => setHoveredId(featured.id)} onMouseLeave={() => setHoveredId(null)} key={featured.id} className='lg:flex flex-col hidden h-max w-full group hover:shadow-2xl lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
                <div className='h-full w-full lg:rounded-t-2xl rounded-t-lg overflow-hidden duration-500'>
                  {hoveredId === featured.id 
                  ? 
                  <Image loading='lazy' src={featured.image2} alt="tee" width="500" height="500" className='w-full h-[500px] group-hover:scale-105 duration-500 object-cover ease-in-out transition-all' />
                  :
                  <Image loading='lazy' src={featured.image} alt="tee" width="500" height="500" className='w-full h-[500px] ease-in-out transition-all object-contain duration-500' />
                  }
                </div>
                <div className='flex flex-col text-center justify-center items-center gap-2 py-7 px-7 lg:px-0'>
                  <h2 className='text-xs lg:text-base'>{featured.title}</h2>
                  <span className='text-xs lg:text-sm text-black/80'>Figment Clique</span>
                  <span className='text-base lg:text-xl'>₱{featured.price}</span>
                </div>
              </div>
              <div className='absolute lg:top-5 top-1.5 lg:left-5 left-2'>
                {isOutOfStock 
                ? 
                  <span className='bg-black lg:py-1 py-0.5 lg:px-4 px-2 rounded-full text-white lg:text-base text-[8px]'>Out of Stock</span> 
                : 
                  ''  
                }
              </div>
            </div>
            </>
            )} 
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts