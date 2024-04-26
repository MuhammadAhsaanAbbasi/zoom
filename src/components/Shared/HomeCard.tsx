import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
  img: string;
  title: string;
  description: string;
  className?: string;
  handleClick?: () => void;
}

const HomeCard = ({img, title, description, className, handleClick}: HomeCardProps) => {
  return (
    <div className={cn('flex flex-col justify-between bg-orange-1 w-full min-h-[260px] xl:max-w-[260px] rounded-[14px] cursor-pointer p-5', className)}
    onClick={handleClick}
    >
      <div className='flex-center glassmorphism size-14 rounded-xl'>
        <Image
        src={img}
        alt='add meeting'
        width={36}
        height={36}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-medium'>{title}</h1>
        <h3>{description}</h3>
      </div>
    </div>
  )
}

export default HomeCard