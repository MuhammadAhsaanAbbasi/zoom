"use client"
import React from 'react'
import { SideBarLinks } from '../../../constants'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname()
  return (
    <section className='sticky top-0 left-0 bg-dark-2 flex h-screen w-fit flex-col pt-28 p-6 justify-between max-sm:hidden lg:w-[260px]'>
        <div className='flex flex-1 flex-col gap-4'>
            {SideBarLinks.map((link) => {
                const isActive = pathname === link.path || pathname.startsWith(`${link.path}/`);
                return(
                    <Link href={link.path} key={link.label}
                    className={cn(`flex gap-4 items-center p-4 rounded-xl`, {
                        "bg-blue-1": isActive
                    })}
                    >
                        <Image 
                        src={link.icon}
                        alt={link.label}
                        className='cursor-pointer'
                        height={20}
                        width={20}
                        />
                        <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar