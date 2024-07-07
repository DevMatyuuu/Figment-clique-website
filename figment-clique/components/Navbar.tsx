'use client'

import { useEffect, useState } from 'react'
import logo from '../assets/logo.webp'
import { Divide as Hamburger } from 'hamburger-react'
import { menu } from '@/constants/menu';
import Link from 'next/link';
import Image from 'next/image';
import useModalStore from '@/store/ModalStore';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('')
  const { isNavModalOpen, setNavModalOpen, setNavModalClose, setCartOpen, setSearchModalOpen } = useModalStore();

  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 180) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className={`flex flex-col gap-4 fixed w-full z-20 bg-black text-white`}>
      <div className={`container mx-auto h-auto lg:max-w-[1070px] px-5 flex lg:justify-between justify-between items-center transition-all`}>
        <div onClick={setSearchModalOpen} className='hidden lg:block size-6 cursor-pointer'>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7828 18.8276C12.3741 18.8298 13.9302 18.3601 15.2544 17.4781C16.5785 16.596 17.6112 15.3413 18.2216 13.8726C18.832 12.4039 18.9929 10.7872 18.6837 9.2271C18.3746 7.66702 17.6093 6.23364 16.4849 5.10831C15.3604 3.98299 13.9272 3.2163 12.3666 2.90525C10.8061 2.5942 9.18823 2.75277 7.71786 3.3609C6.24748 3.96902 4.99062 4.99937 4.10632 6.32158C3.22202 7.64379 2.75 9.19844 2.75 10.7888C2.75 12.919 3.59596 14.9621 5.10209 16.4693C6.60821 17.9766 8.65135 18.8248 10.7828 18.8276Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.4883 16.491L21.25 21.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div className='lg:hidden'>
          <Hamburger size={24} toggled={isNavModalOpen} toggle={() => setNavModalOpen(!isNavModalOpen)}/>
        </div>
        <Image priority src={logo} alt="figment-clique-logo" className={`${isScrolled ? 'lg:w-[8rem] h-full w-[8rem] lg:py-6 py-3 transition-all duration-300 ease-in-out' : 'lg:w-[10rem] h-full w-[10rem] lg:py-10 py-5 transition-all duration-300 ease-in-out'}`}/>
        <div className='flex items-center gap-5'>
          <div onClick={setSearchModalOpen} className='lg:hidden size-6 cursor-pointer'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7828 18.8276C12.3741 18.8298 13.9302 18.3601 15.2544 17.4781C16.5785 16.596 17.6112 15.3413 18.2216 13.8726C18.832 12.4039 18.9929 10.7872 18.6837 9.2271C18.3746 7.66702 17.6093 6.23364 16.4849 5.10831C15.3604 3.98299 13.9272 3.2163 12.3666 2.90525C10.8061 2.5942 9.18823 2.75277 7.71786 3.3609C6.24748 3.96902 4.99062 4.99937 4.10632 6.32158C3.22202 7.64379 2.75 9.19844 2.75 10.7888C2.75 12.919 3.59596 14.9621 5.10209 16.4693C6.60821 17.9766 8.65135 18.8248 10.7828 18.8276Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.4883 16.491L21.25 21.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div onClick={() => {setNavModalClose(); setCartOpen()}} className='size-6 lg:size-6 cursor-pointer'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.48438 6.21877V18.3594C4.48438 19.126 4.78893 19.8613 5.33103 20.4034C5.87312 20.9455 6.60836 21.25 7.375 21.25H16.625C17.3916 21.25 18.1269 20.9455 18.669 20.4034C19.2111 19.8613 19.5156 19.126 19.5156 18.3594V6.21877" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19.5156 6.21877L16.3822 3.08533C16.2741 2.97817 16.146 2.89339 16.0051 2.83585C15.8643 2.77831 15.7134 2.74914 15.5612 2.75002H8.43875C8.28658 2.74914 8.13574 2.77831 7.99486 2.83585C7.85399 2.89339 7.72586 2.97817 7.61782 3.08533L4.48438 6.21877H19.5156Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.53126 9.68752L8.8897 10.3928C9.12882 10.8754 9.49801 11.2816 9.95564 11.5655C10.4133 11.8495 10.9411 12 11.4797 12H12.5203C13.0589 12 13.5867 11.8495 14.0444 11.5655C14.502 11.2816 14.8712 10.8754 15.1103 10.3928L15.4688 9.68752" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex gap-14 justify-center items-center pb-4'>
      {menu.map((link) => (
        <Link href={link.route} key={link.id} className='cursor-pointer'>
          <span className={`${active === link.title || link.route === pathname ? 'text-white underline underline-offset-8' : 'text-white/70 hover:text-white duration-200'}`}>
            {link.title}
          </span>
        </Link>
      ))}
    </div>
    </div>
    {/* mobile nav */}
    <div className={`${isNavModalOpen ? 'left-0' : '-left-[1500px]'} lg:hidden bg-black z-50 fixed top-[70px] w-full h-screen duration-500 transition-all`}>
      <div className='flex flex-col h-full justify-start pt-36 gap-9 text-4xl px-10 text-white'>
        {menu.map((link) => (
          <Link href={link.route} key={link.id} className='cursor-pointer w-max' onClick={() => setNavModalClose()}>
            <span className={`${active === link.title || link.route === pathname ? 'text-white underline underline-offset-8' : 'text-white/70 hover:text-white duration-200'}`}>{link.title}</span>
          </Link>
        ))}
      </div>
    </div>
    </>
  )
}

export default Navbar