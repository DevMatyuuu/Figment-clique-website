'use client'

import React from 'react'

const CatalogItems = () => {
  return (
    <div key={catalog._id._bsontype} className="flex flex-col w-full justify-center items-center bg-white text-black rounded-xl group cursor-pointer">
        <Image src={catalog.image} alt={catalog.title} width='150' height='200' className="rounded-xl w-[250px] h-full object-cover  group-hover:scale-105 duration-500 cursor-pointer"/>
        <h1 className="text-lg z-40" data-aos='fade-up'>{catalog.title}</h1>
        <h1 className="text-lg" data-aos='fade-up'>{catalog.price}</h1>
    </div>
  )
}

export default CatalogItems