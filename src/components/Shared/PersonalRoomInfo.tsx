"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Table = ({title, description}: {title: string, description: string}) => (
  <div className='flex flex-col items-start gap-3 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}:</h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</h1>
  </div>
)

const PersonalRoomInfo = () => {
    const { user } = useUser()
    const meetingId = user?.id
  return (
    <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title="Topic" description={`${user?.username}'s meeting room`}/>
        <Table title="Meeting ID" description={meetingId!}/>
        <Table title="Invite Link" description="Room Owner"/>
    </div>
  )
}

export default PersonalRoomInfo