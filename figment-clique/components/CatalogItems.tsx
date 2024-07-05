'use client'

import React, { useState, useEffect } from 'react';

type catalogProps = {
  id: string,
  title: string,
  image: string,
  image2: string,
  price: string
}

const CatalogItems = () => {
  const [catalogData, setCatalogData] = useState<Array<catalogProps>>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/catalog')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setCatalogData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching catalog data', error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p className='text-black'>Loading...</p>;
  if (!catalogData || catalogData.length === 0) return <p>No catalog data available</p>;

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 w-full'>
      {catalogData.map((item) => (
        <div key={item.id} className="flex flex-col w-full justify-center items-center bg-white text-black rounded-xl group cursor-pointer">
          <img src={item.image} alt={item.title} width="150" height="200" className="rounded-xl lg:w-[250px] h-full object-cover group-hover:scale-105 duration-500 cursor-pointer" />
          <h1 className="text-lg z-40" data-aos="fade-up">
            {item.title}
          </h1>
          <h1 className="text-lg" data-aos="fade-up">
            {item.price}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CatalogItems;
