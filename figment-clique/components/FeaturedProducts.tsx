'use client'

import { useState } from 'react'
import { sampleProduct } from '@/constants/menu';
import Image from 'next/image';

const FeaturedProducts = () => { 
  const [hoveredId, setHoveredId] = useState<null | number>(null);

  return (
    <div className="w-full bg-white pt-10 h-auto">
      <div className="text-black flex flex-col container mx-auto max-w-[1070px] px-5">
        <h1 className="lg:text-3xl text-xl">Featured Products</h1>
        <div className='grid grid-cols-2 lg:gap-10 gap-5 lg:py-10 py-10'>
          {sampleProduct.map((sample) => (
            <>
            <div className='lg:hidden h-max w-full group hover:shadow-2xl lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
              <div className='h-full w-full lg:rounded-t-2xl rounded-t-lg overflow-hidden duration-500'>
                <Image src={sample.image} alt="tee" className='w-full lg:h-[500px] h-[200px] ease-in-out transition-all duration-500' loading='lazy'/>
              </div>
              <div className='flex flex-col text-center justify-center items-center gap-2 py-7 px-7 lg:px-0'>
                <h2 className='text-xs lg:text-base'>{sample.title}</h2>
                <span className='text-xs lg:text-sm text-black/50'>Figment Clique</span>
                <span className='text-base lg:text-xl'>{sample.price}</span>
              </div>
            </div>
            <div onMouseEnter={() => setHoveredId(sample.id)} onMouseLeave={() => setHoveredId(null)} key={sample.id} className='lg:block hidden h-max w-full group hover:shadow-2xl lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
              <div className='h-full w-full lg:rounded-t-2xl rounded-t-lg overflow-hidden duration-500'>
                {hoveredId === sample.id 
                ? 
                <Image loading='lazy' src={sample.image2} alt="tee" className='w-full lg:h-[500px] h-[200px] group-hover:scale-105 duration-500 object-cover ease-in-out transition-all' />
                :
                <Image loading='lazy' src={sample.image} alt="tee" className='w-full lg:h-[500px] h-[200px] ease-in-out transition-all duration-500' />
                }
              </div>
              <div className='flex flex-col text-center justify-center items-center gap-2 py-7 px-7 lg:px-0'>
                <h2 className='text-xs lg:text-base'>{sample.title}</h2>
                <span className='text-xs lg:text-sm text-black/50'>Figment Clique</span>
                <span className='text-base lg:text-xl'>{sample.price}</span>
              </div>
            </div></>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts