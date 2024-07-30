'use client'

import { Cart } from '@/types';
import logo from '@/assets/logo.webp'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useModalStore from '@/store/ModalStore';
import useCartStore from '@/store/CartStore';
import Image from 'next/image';
import { TbArrowBackUp } from "react-icons/tb";
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CldImage } from 'next-cloudinary';
import RelatedProducts from './RelatedProducts';
import { useRouter } from 'next/navigation';
import { catalog, stocks } from '@prisma/client';



interface params {
  paramsTitle: string
  catalog: Array<catalog> | undefined
  stocks: Array<stocks> | undefined
}


const ProductDetails = ({paramsTitle, catalog, stocks} : params) => {
  const { addToCart, setSelectedSize, selectedSize } = useCartStore();
  const [selectedPreview, setSelectedPreview] = useState('');
  const { setCartOpen } = useModalStore();
  const [isClicked, setIsClicked] = useState(1)

  const router = useRouter();

  const buyNow = (id: string | undefined) => {
    router.push(`/checkout/buynow/${id}`)
  }

  const decodedParams = decodeURIComponent(paramsTitle);
  
  const catalogItemData = catalog?.find(item => item.title === decodedParams);
  const catalogStocks = stocks?.find(item => item.catalogId === catalogItemData?.id)

  const addToCartDisabled = !selectedSize
                            || catalogStocks?.small as number === 0 && selectedSize === 'Small' 
                            || catalogStocks?.medium as number === 0 && selectedSize === 'Medium'
                            || catalogStocks?.large as number === 0 && selectedSize === 'Large'
                            || catalogStocks?.xl as number === 0 && selectedSize === 'XL'
                            || catalogStocks?.xxl as number === 0 && selectedSize === 'XXL'
  
  const previewImages = [
    {
      id: 1,
      image: catalogItemData?.image,
      title: catalogItemData?.title
    },
    {
      id: 2,
      image: catalogItemData?.image2,
      title: catalogItemData?.title
    },
    {
      id: 3,
      image: catalogItemData?.image2,
      title: catalogItemData?.title
    },
    {
      id: 4,
      image: catalogItemData?.image2,
      title: catalogItemData?.title
    },
  ]

  return (
    <div className={`${!catalog ? 'h-screen' : 'h-auto min-h-screen'} flex flex-col gap-10 container mx-auto max-w-[1070px] px-5 w-full lg:pt-10 lg:pb-20 py-10 lg:py-0`}>
      <Link href={'/catalog'} onClick={() => setSelectedSize('')} className='flex items-center gap-2 text-lg cursor-pointer w-max'>
        <TbArrowBackUp className='text-white'/>
        <div className='text-white'>Back</div>
      </Link>
      <div className="text-white flex lg:flex-row flex-col-reverse gap-10 w-full">
        <div className='flex flex-col w-full lg:pt-10'>
          <h1 className='text-2xl lg:text-4xl'>{catalogItemData?.title}</h1>
          <div className='flex flex-row-reverse w-full justify-end my-5 items-center gap-10'>
            <span className='text-base lg:text-lg'>₱{catalogItemData?.price} PHP</span>
            <Select onValueChange={(value) => setSelectedSize(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pick a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Small'>{catalogStocks?.small as number > 0 ? <span>Small</span> : <span>Small - Unavailable</span> }</SelectItem>
                <SelectItem value='Medium'>{catalogStocks?.medium as number > 0 ? <span>Medium</span> : <span>Medium - Unavailable</span> }</SelectItem>
                <SelectItem value='Large'>{catalogStocks?.large as number > 0 ? <span>Large</span> : <span>Large - Unavailable</span> }</SelectItem>
                <SelectItem value='XL'>{catalogStocks?.xl as number > 0 ? <span>XL</span> : <span>XL - Unavailable</span> }</SelectItem>
                <SelectItem value='XXL'>{catalogStocks?.xxl as number > 0 ? <span>XXL</span> : <span>XXL - Unavailable</span> }</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className={`${addToCartDisabled ? 'block' : 'hidden'} text-[.8rem] text-red-500`}>
            {!selectedSize
            ?
            <span>Pick a size first to add to cart and to buy now*</span>
            :
            <span>This item is out of stock</span>
            }
          </span>
          <button onClick={() => {addToCart(catalogItemData as unknown as Cart); setCartOpen();}} disabled={addToCartDisabled} className={`${addToCartDisabled ? 'cursor-not-allowed bg-white/60 hover:bg-white/60 hover:text-black' : 'hover:bg-white/70 hover:text-white'} bg-white text-black mt-5 h-10 rounded-lg lg:w-[300px]  w-full duration-200`}>Add to cart</button>
          <button onClick={() => buyNow(catalogItemData?.id)} disabled={addToCartDisabled} className={`${addToCartDisabled ? 'cursor-not-allowed bg-red-500/60 text-white/70 hover:bg-red-500/60 hover:text-white/70' : 'hover:bg-red-600 hover:text-white'} bg-red-500 text-white mt-5 h-10 rounded-lg lg:w-[300px]  w-full duration-200`}>Buy Now</button>
        </div>
        <div className='flex flex-col lg:w-[50%] w-full gap-10 mx-auto'>
          <div className='lg:w-full w-[80%] lg:mx-0 mx-auto'>
            {catalogItemData?.image 
            ? 
            <CldImage src={selectedPreview ? selectedPreview : catalogItemData.image} alt={catalogItemData?.title as string} width={600} height={400} className='h-full w-full lg:w-full rounded-lg bg-white' />
            :
            <div className='flex justify-center items-center w-full h-full'>
              <Image src={logo} alt='logo' width={600} height={400} className='w-full h-full'/>
            </div>}
          </div>
          <div className='w-full'>
            <Swiper 
            slidesPerView={3}
            spaceBetween={0}
            className='flex w-full'>
              {previewImages.map((image) => (
              <SwiperSlide className='h-full my-auto' key={image.id}>
                {image.image 
                ?
                <CldImage src={image.image as string} alt={image.title as string} onClick={() => {setSelectedPreview(image.image as string); setIsClicked(image.id)}} width={150} height={100} className={`${isClicked === image.id ? 'border border-white/30 ' : ''} mx-auto cursor-pointer w-[120px] rounded-lg h-[100px] object-contain`}/> 
                :
                ''
                }
              </SwiperSlide>
               ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:gap-20 gap-10 mt-16'>
        <span className='text-white text-4xl text-center lg:text-start'>Related Products</span>
        <RelatedProducts decodedParams={decodedParams} catalogItemData={catalogItemData} catalog={catalog} />
      </div>
    </div>
  )
}

export default ProductDetails   