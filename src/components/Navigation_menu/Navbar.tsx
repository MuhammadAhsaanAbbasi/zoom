import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className='flex flex-between bg-dark-2 fixed w-full px-6 py-4 lg:px-10 z-50'>
      <Link href={"/"}
      className='flex items-center gap-2'
      >
        <Image
        src={"/icons/logo.svg"}
        alt="LOOM LOGO"
        height={40}
        width={40}
        className='cursor-pointer max-sm:size-10'
        />
        <Image
        src={"/icons/loom.svg"}
        alt="LOOM LOGO"
        height={75}
        width={75}
        className='cursor-pointer size-[75px] font-semibold max-sm:hidden'
        />
      </Link>
      <div className='flex-between gap-5'>
        <p>Custom Auth</p>
        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar