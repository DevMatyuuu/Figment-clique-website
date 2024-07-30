'use client'

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { catalog, stocks } from '@prisma/client';

interface productsProps {
  catalog: Array<catalog> | undefined
  stocks: Array<stocks> | undefined
}

const Products = ({catalog, stocks}: productsProps) => {

  useEffect(() => {
    AOS.init();
  })

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
      {catalog?.map((item, index) => {
        const duration = (200 * index) + 400;

        const stockEntry = stocks?.find((stock) => stock.catalogId === item.id);
            const isOutOfStock = 
              stockEntry?.small as number === 0 &&
              stockEntry?.medium as number === 0 &&
              stockEntry?.large as number === 0 &&
              stockEntry?.xl as number === 0 &&
              stockEntry?.xxl as number === 0

        return (
          <Link href={`/catalog/${item.title}`} key={item.id} data-aos="fade-zoom-in" data-aos-once="true" data-aos-easing="ease-in-back" data-aos-duration={duration} className={`${item.image ? 'flex ' : 'hidden'} relative h-max flex-col w-full justify-center items-center bg-white  text-black rounded-xl group cursor-pointer pb-4`}>
            <CldImage src={item.image} alt={item.title} width="200" height='200' className="rounded-xl lg:w-[250px] py-10 lg:h-[300px] h-[220px] object-cover group-hover:scale-105 duration-500 cursor-pointer" />
            <h1 className="text-xs text-center lg:text-base z-40 group-hover:underline underline-offset-2 underline-black mb-3">
              {item.title}
            </h1>
            <h1 className="text-sm text-center">
              ₱{item.price}
            </h1>
            <div className='absolute lg:top-5 top-2 left-3'>
              {isOutOfStock 
              ? 
                <span className='bg-black py-1 px-3 lg:text-sm text-[8px] rounded-full text-white'>Out of Stock</span> 
              : 
                ''  
              }
            </div>
          </Link>
        )
      })}
    </div>
  );
};

export default Products;
