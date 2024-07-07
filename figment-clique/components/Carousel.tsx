'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useState } from 'react';
import SwiperCore  from 'swiper';
import image1 from '../assets/image1.webp'
import image2 from '../assets/image2.webp'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Image from 'next/image';

const Carousel = () => {
    const [swiper, setSwiper] = useState<SwiperCore| null>(null);

  return (
    <div className='relative pt-[97px] lg:pt-[185px] '>
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          autoplay={{delay: 6000}}
          pagination={{
            clickable: true,
            type: 'fraction',
          }}
          effect={'fade'}
          modules={[Pagination, Navigation, A11y, Autoplay, EffectFade]}
          loop={true}
          className='flex pb-10 bg-black text-white/80 h-auto text-sm'>
              <SwiperSlide className='bg-black'>
                <Image src={image1} alt='logo' className='mx-auto h-full pb-9 w-full brightness-90' priority/>
              </SwiperSlide>
              <SwiperSlide className='bg-black'>
                <Image src={image2} alt='logo' className='mx-auto h-full pb-9 w-full brightness-90' priority/>
              </SwiperSlide>
        </Swiper>
        <div className='flex relative mx-auto w-[120px]'>
          <button className='absolute bottom-[8px] z-10 text-white/60 hover:text-white duration-300' onClick={() => swiper?.slidePrev()}><MdKeyboardArrowLeft className='size-5' /></button>
          <button className='absolute bottom-[8px] right-0 text-white/60 z-10 hover:text-white duration-300' onClick={() => swiper?.slideNext()}><MdKeyboardArrowRight className='size-5' /></button>
        </div>
      </div>
  )
}

export default Carousel