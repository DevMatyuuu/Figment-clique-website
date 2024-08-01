'use client'

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CldImage } from 'next-cloudinary';
import { stocks } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getCatalog } from '@/api/getCatalog';
import CatalogPaginationControls from './CatalogPaginationControls';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface productsProps {
  stocks: Array<stocks> | undefined
}

const Products = ({stocks}: productsProps) => {

  const { data, error, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: getCatalog,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    AOS.init();
  })

  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '8'

  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page) 

  const entries = data?.catalog?.slice(start, end)

  return (
    <>
    <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
      {entries?.map((item, index) => {
        const duration = (200 * index) + 400;

        const stockEntry = stocks?.find((stock) => stock.catalogId === item.id);
            const isOutOfStock = 
              stockEntry?.small as number === 0 &&
              stockEntry?.medium as number === 0 &&
              stockEntry?.large as number === 0 &&
              stockEntry?.xl as number === 0 &&
              stockEntry?.xxl as number === 0

        return (
          <Link href={`/catalog/${item.title}`} prefetch={true} key={item.id} data-aos="fade-zoom-in" data-aos-once="true" data-aos-easing="ease-in-back" data-aos-duration={duration} className={`${item.image ? 'flex ' : 'hidden'} relative h-max flex-col w-full justify-center items-center bg-white  text-black rounded-xl group cursor-pointer pb-4`}>
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
    <CatalogPaginationControls hasNextPage={data?.catalog && end < data?.catalog.length} hasPrevPage={start > 0} />
    </>
  );
};

export default Products;
