'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

type featuredProps = {
  id: string,
  title: string,
  image: string,
  image2: string,
  price: string,
  featured: boolean,
}

const FeaturedProducts = () => { 
  const [hoveredId, setHoveredId] = useState<null | string>(null);
  const [featuredData, setFeaturedData] = useState<Array<featuredProps>>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  })

  useEffect(() => {
    fetch('/api/catalog')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setFeaturedData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching catalog data', error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!featuredData || featuredData.length === 0) return <p>No catalog data available</p>;

  return (
    <div className="w-full bg-white pt-10 h-auto z-50">
      <div className="text-black flex flex-col container mx-auto max-w-[1070px] px-5">
        <h1 className="lg:text-3xl text-xl">Featured Products</h1>
        <div className='grid grid-cols-2 lg:gap-10 gap-5 lg:py-10 py-10'>
          {featuredData.map((featured) => (
            <>
            <div data-aos="fade-up" className='lg:hidden h-max w-full group hover:shadow-2xl lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
              <div className='h-full w-full rounded-t-lg overflow-hidden duration-500'>
                <Image src={featured.image} width="200" height="500" alt="tee" className='w-full lg:h-[300px] h-[270px] ease-in-out transition-all duration-500' loading='lazy'/>
              </div>
              <div className='flex flex-col text-center justify-center items-center gap-2 py-7 px-7 lg:px-0'>
                <h2 className='text-xs lg:text-base'>{featured.title}</h2>
                <span className='text-xs lg:text-sm text-black/50'>Figment Clique</span>
                <span className='text-base lg:text-xl'>{featured.price}</span>
              </div>
            </div>
            <div onMouseEnter={() => setHoveredId(featured.id)} onMouseLeave={() => setHoveredId(null)} key={featured.id} className='lg:block hidden h-max w-full group hover:shadow-2xl lg:rounded-2xl rounded-lg cursor-pointer duration-400 transition-all'>
              <div className='h-full w-full lg:rounded-t-2xl rounded-t-lg overflow-hidden duration-500'>
                {hoveredId === featured.id 
                ? 
                <Image loading='lazy' src={featured.image2} alt="tee" width="500" height="500" className='w-full h-[500px] group-hover:scale-105 duration-500 object-cover ease-in-out transition-all' />
                :
                <Image loading='lazy' src={featured.image} alt="tee" width="500" height="500" className='w-full h-[500px] ease-in-out transition-all object-cover duration-500' />
                }
              </div>
              <div className='flex flex-col text-center justify-center items-center gap-2 py-7 px-7 lg:px-0'>
                <h2 className='text-xs lg:text-base'>{featured.title}</h2>
                <span className='text-xs lg:text-sm text-black/50'>Figment Clique</span>
                <span className='text-base lg:text-xl'>{featured.price}</span>
              </div>
            </div></>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts