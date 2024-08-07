'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
  hasNextPage: boolean | undefined
  hasPrevPage: boolean
}

export default function CatalogPaginationControls({hasNextPage, hasPrevPage} : PaginationControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '8'

  const totalPages = Math.ceil(10 / Number(per_page))

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className='pb-10'>
      <PaginationContent className='flex gap-6 items-center'>
          <button aria-label='prev' className={`${!hasPrevPage && 'text-white/50'} bg-none text-white cursor-pointer hover:bg-white/30 duration-200 py-2 px-2 rounded-full`} disabled={!hasPrevPage} onClick={() => { router.push(`/catalog?page=${Number(page) - 1}&per_page=${per_page}`)}}>
           <ChevronLeft className='lg:size-5'/>
          </button>
        
        {pageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber} className='cursor-pointer'>
              <PaginationLink onClick={() => router.push(`/catalog?page=${pageNumber}&per_page=${per_page}`)} className={`${Number(page) === pageNumber ? 'bg-white text-black' : 'text-white  bg-none'}`}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <button aria-label='next' className={`${!hasNextPage && 'text-white/50'} bg-none text-white cursor-pointer hover:bg-white/30 duration-200 py-2 px-2 rounded-full`} disabled={!hasNextPage} onClick={() => { router.push(`/catalog?page=${Number(page) + 1}&per_page=${per_page}`)}}>
            <ChevronRight className='lg:size-5'/>
          </button>
      </PaginationContent>
    </Pagination>
  )
}
