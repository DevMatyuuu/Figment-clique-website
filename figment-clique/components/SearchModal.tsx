'use client'

import useModalStore from '@/store/ModalStore'
import React from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'

const SearchModal = () => {
  const { isSearchModalOpen, setSearchModalClose } = useModalStore(); 
  return (
    <div className={`${isSearchModalOpen ? 'z-50 opacity-1' : '-z-10 opacity-0'} w-full h-full fixed top-0 bg-black/50 duration-500 transition-all`}>
      <div className={`${isSearchModalOpen ? 'top-0' : 'top-[-2000px]'} flex px-5 justify-center lg:items-center pt-16 lg:pt-0 gap-2 w-full lg:h-60 h-full fixed top-0 bg-black duration-300 transition-all`}>
        <div className='flex h-max w-full lg:w-max relative text-white'>
          <input className='rounded-lg bg-black border border-white hover:border-2 h-14 lg:w-[700px] w-full px-3' placeholder='Search here...'/>
          <IoSearch className='absolute h-20 lg:right-4 right-5 text-white/70 hover:text-white -top-3 text-2xl'/>
        </div>
        <IoClose onClick={setSearchModalClose} className='mt-3 lg:mt-0 text-white/70 hover:text-white duration-500 text-3xl cursor-pointer'/>
      </div>
    </div>
  )
}

export default SearchModal