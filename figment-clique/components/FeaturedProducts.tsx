'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { catalog, stocks } from '@prisma/client';

interface FeaturedProductProps {
  catalog: Array<catalog> | undefined
  stocks: Array<stocks> | undefined
}

const FeaturedProducts = ({catalog, stocks}: FeaturedProductProps) => { 
  const [hoveredId, setHoveredId] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  })

  const seeProduct = (title: string) => {
    router.push(`/catalog/${title}`)
  }

  if (!catalog) return <p>Loading...</p>;
  if (catalog?.length === 0) return <p className='text-white'>No catalog data available</p>;

  return (
    <div className="w-full bg-white pt-10 h-auto z-50">
      <div className="text-black flex flex-col container mx-auto max-w-[1070px] px-5">
        <h1 className="lg:text-3xl text-xl">Featured Tops</h1>
        <div className='relative grid grid-cols-2 lg:gap-10 gap-5 lg:py-10 py-10'>
          {catalog?.map((featured) => {
            const stockEntry = stocks?.find((stock) => stock.catalogId === featured.id);
            const isOutOfStock = 
              stockEntry?.small as number === 0 &&
              stockEntry?.medium as number === 0 &&
              stockEntry?.large as number === 0 &&
              stockEntry?.xl as number === 0 &&
              stockEntry?.xxl as number === 0

            return(
            <>
            <div className='flex flex-col'>
              <div onClick={() => seeProduct(featured.title)} data-aos="fade-up" data-aos-duration='4000' data-aos-once={true} className='lg:hidden flex flex-col h-max w-full group lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
                <div className='h-full w-full rounded-t-lg overflow-hidden duration-500'>
                  <CldImage src={featured.image} width="200" height="500" alt="tee" className='w-full h-[200px] ease-in-out transition-all duration-500' loading='lazy'/>
                </div>
                <div className='flex flex-col text-center justify-center items-center gap-2 py-4 px-7 lg:px-0'>
                  <h2 className='text-xs lg:text-base'>{featured.title}</h2>
                  <span className='text-xs lg:text-sm text-black/50'>Figment Clique</span>
                  <span className='text-base lg:text-xl'>₱{featured.price}</span>
                </div>
                <div className='absolute top-1.5 left-2'>
                  {isOutOfStock 
                  ? 
                    <span className='bg-black py-0.5 px-2 rounded-full text-white text-[8px]'>Out of Stock</span> 
                  : 
                    ''  
                  }
                </div>
              </div>
              <div onClick={() => seeProduct(featured.title)} data-aos="fade-up" data-aos-duration='3000' data-aos-once={true} onMouseEnter={() => setHoveredId(featured.id)} onMouseLeave={() => setHoveredId(null)} key={featured.id} className='relative lg:flex flex-col hidden h-max w-full group hover:shadow-2xl lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
                <div className='h-full w-full lg:rounded-t-2xl rounded-t-lg overflow-hidden duration-500'>
                  <CldImage src={hoveredId === featured.id ? featured.image2 : featured.image} alt="tee" width="400" height="400" className='w-full h-[500px] group-hover:scale-105 duration-500 object-cover ease-in-out transition-all' />
                </div>
                <div className='flex flex-col text-center justify-center items-center gap-2 py-7 px-7 lg:px-0'>
                  <h2 className='text-xs lg:text-base'>{featured.title}</h2>
                  <span className='text-xs lg:text-sm text-black/80'>Figment Clique</span>
                  <span className='text-base lg:text-xl'>₱{featured.price}</span>
                </div>
                <div className='absolute lg:top-5 lg:left-5'>
                  {isOutOfStock 
                  ? 
                    <span className='bg-black lg:py-1 lg:px-4 rounded-full text-white lg:text-base'>Out of Stock</span> 
                  : 
                    ''  
                  }
                </div>
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