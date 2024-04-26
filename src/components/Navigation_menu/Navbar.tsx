import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { UserButton } from '@clerk/nextjs'

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
          height={70}
          width={80}
          className='cursor-pointer size-[80px] font-semibold max-sm:hidden'
        />
      </Link>
      <div className='flex-between gap-5'>
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              button: {
                width: '40px', // Set the width to 100px
                height: '40px', // Set the height to 150px
              },
            },
          }}
        />
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar