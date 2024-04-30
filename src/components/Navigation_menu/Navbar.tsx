import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <nav className='flex flex-between h-[72px] bg-dark-2 fixed w-full px-6 py-4 lg:px-10 z-40'>
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
          afterSignOutUrl='/'/>
        <SignedOut>
          <Button className='bg-blue-1 hover:rounded-3xl transition-all duration-300'>
          <SignInButton />
          </Button>
        </SignedOut>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar