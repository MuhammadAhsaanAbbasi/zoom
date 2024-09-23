"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SideBarLinks } from '../../../constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = () => {
    const pathname = usePathname()
    return (
        <section className='sm:hidden'>
            <Sheet>
                <SheetTrigger asChild>
                    <Menu height={36} width={36} className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent side={"left"} className='bg-dark-2 border-none'>
                    <Link href={"/"}
                        className='flex items-center gap-1'
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
                            className='cursor-pointer size-[80px] max-sm:size-10'
                        />
                    </Link>
                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16">
                                {SideBarLinks.map((link) => {
                                    const isActive = pathname === link.path;
                                    return (
                                        <SheetClose asChild key={link.label}>
                                            <Link href={link.path} key={link.label}
                                        className={cn(
                                            'flex gap-4 items-center p-4 rounded-xl w-full max-w-60',
                                            {
                                              'bg-blue-1': isActive,
                                            }
                                          )}
                                        >
                                            <Image 
                                            src={link.icon}
                                            alt={link.label}
                                            className='cursor-pointer'
                                            height={20}
                                            width={20}
                                            />
                                            <p className='font-semibold'>{link.label}</p>
                                        </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav