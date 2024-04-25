import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex'>
      <Link href={"/"}
      className='flex'
      >
        <Image
        src={"/icons/logo.svg"}
        alt="LOOM LOGO"
        height={40}
        width={40}
        className='cursor-pointer'
        />
        <p className="text-[30px] font-semibold">LOOM</p>
      </Link>
    </nav>
  )
}

export default Navbar