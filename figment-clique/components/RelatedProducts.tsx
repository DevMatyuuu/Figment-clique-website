import { catalog } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import React from 'react'
import 'swiper/css';
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import { getCatalog } from '@/app/api/getCatalog';

interface relatedProductProps {
  decodedParams: string
  catalogItemData: catalog | undefined
}

const RelatedProducts = ({decodedParams, catalogItemData}: relatedProductProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: getCatalog,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  const relatedProducts = data?.catalog?.filter(item => item.category === catalogItemData?.category )
                               .filter(item => item.title !== decodedParams)
  
  const shuffledRelatedProducts = relatedProducts?.map(value => ({ value, sort: Math.random()}))
                                                  .sort((a, b) => a.sort - b.sort)
                                                  .map(({ value }) => value)

  return (
    <>
      <Swiper 
        breakpoints={{
          375: {
            slidesPerView: 2
          },
          700: {
            slidesPerView: 3
          },
          1025: {
            slidesPerView: 5
          },
        }}
        slidesPerView={5} 
        className='w-full items-center'
        pagination={true}
        modules={[Pagination]}>
        {shuffledRelatedProducts && shuffledRelatedProducts.map((related) => (
          <SwiperSlide key={related.id} className='flex flex-col justify-center text-white items-center pb-20'>
            <Link href={`/catalog/${encodeURI(related.title)}`} className='flex justify-center'>
              <CldImage src={related.image} alt={related.title} width={100} height={100} className='w-40 bg-white rounded-lg cursor-pointer hover:bg-white/90 duration-200'/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default RelatedProducts