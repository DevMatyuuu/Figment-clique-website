import React, { ChangeEvent, KeyboardEvent} from 'react'
import { IoSearch } from 'react-icons/io5'

interface searchInputProps {
  searchFilter: (e: ChangeEvent<HTMLInputElement>) => void,
  searchValue: string,
  arrowNavigation: (e: KeyboardEvent<HTMLInputElement>) => void,
}

const SearchInput = ({searchFilter, searchValue, arrowNavigation} : searchInputProps) => {

  return (
    <form className='flex h-max w-full lg:w-max relative text-white'>
      <input onKeyDown={arrowNavigation} value={searchValue} onChange={searchFilter} className='rounded-lg bg-black border border-white h-14 lg:w-[700px] w-full px-3' placeholder='Search here...'/>
      <IoSearch className='absolute h-20 lg:right-4 right-5 text-white/70 hover:text-white duration-300 -top-3 text-2xl cursor-pointer'/>
    </form>
  )
}

export default SearchInput