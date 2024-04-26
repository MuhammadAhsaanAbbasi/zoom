"use client"
import Image from 'next/image'
import React from 'react'

const MeetingList = () => {
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <div className='flex flex-col justify-between bg-orange-1 w-full min-h-[260px] xl:max-w-[260px] rounded-[14px] cursor-pointer p-5'
      onClick={()=>{}}
      >
        <div className='flex-center glassmorphism size-14 rounded-xl'>
          <Image
          src={'/icons/add-meeting.svg'}
          alt='add meeting'
          width={36}
          height={36}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-medium'>New Meeting</h1>
          <h3>SetUp a new recording</h3>
        </div>
      </div>
    </section>
  )
}

export default MeetingList