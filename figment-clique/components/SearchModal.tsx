'use client'

import useModalStore from '@/store/ModalStore'
import { IoClose } from 'react-icons/io5'
import SearchInput from './SearchInput'
import useFetchCatalog from '@/hooks/useFetchCatalog'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { catalog } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import { useRouter } from 'next/navigation'

const SearchModal = () => {
  const { isSearchModalOpen, setSearchModalClose } = useModalStore();
  const [ results, setResults ] = useState<Array<catalog> | undefined>([]) 
  const { data, error, isLoading } = useFetchCatalog();
  const [searchValue, setSearchValue] = useState('')
  const [selectedResult, setSelectedResult] = useState(-1)

  const router = useRouter();

  const resultData = results as Array<catalog>

  const SearchFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setResults(data?.filter(result => result.title.toLowerCase().includes(e.target.value)));
  }

  const resultClicked = (title: string) => {
    const encodedTitle = encodeURI(title);
    router.push(`/catalog/${encodedTitle}`);
    setSearchValue('');
    setSearchModalClose();
  }

  const arrowNavigation = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'ArrowUp' && selectedResult > 0) {
      setSelectedResult(prev => prev - 1)
    }
    else if(e.key === 'ArrowDown' && selectedResult < resultData.length -1) {
      setSelectedResult(prev => prev + 1)
    }
    else if(e.key === 'Enter' && selectedResult >= 0) {
      window.open(`/catalog/${resultData[selectedResult].title}`)
    }
  }
  
  return (
    <div className={`${isSearchModalOpen ? 'z-50 opacity-1' : '-z-10 opacity-0'} flex flex-col w-full h-full fixed top-0 bg-black/50 duration-500 transition-all`}>
      <div className={`${isSearchModalOpen ? 'top-0' : 'top-[-2000px]'} flex px-5 justify-center lg:items-center pt-16 lg:pt-0 gap-2 w-full lg:h-60 h-full fixed top-0 bg-black duration-300 transition-all`}>
        <div className='flex flex-col mx-auto  w-full lg:w-max'>
          <div className='flex items-center w-full gap-3'>
            <SearchInput searchFilter={SearchFilter} searchValue={searchValue} arrowNavigation={arrowNavigation} />
            <IoClose onClick={setSearchModalClose} className='lg:mt-0 text-white/70 hover:text-white duration-300 text-3xl cursor-pointer'/>
          </div>
          <div className='relative'>
          {searchValue && 
            <div className='absolute top-1 flex flex-col bg-black z-50 w-full lg:w-[95%] px-4 py-4 h-auto rounded-lg lg:border-2 border-white/40'>
              {resultData.length > 0
              ?
              <>
                {results?.map((item, index) => (
                  <div key={item.id} className={`${selectedResult === index && 'bg-white/10'} flex items-center justify-start gap-5 lg:gap-2 cursor-pointer lg:hover:bg-white/10 rounded-lg px-2 py-1`} onClick={() => resultClicked(item.title)}>
                    <CldImage src={item.image as string} alt={item.title} width={200} height={200} className='lg:w-[50px] w-[30%]'/>
                    <div className='flex flex-col text-white gap-3'>
                      <h1 className='text-sm lg:text-xs'>{item.title}</h1>
                      <span className='text-sm lg:text-xs'>₱{item.price}</span>
                    </div>
                  </div>
                ))}
              </>
              :
              <span className='text-white'>No results found for: {searchValue}</span>
              }
            </div>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal