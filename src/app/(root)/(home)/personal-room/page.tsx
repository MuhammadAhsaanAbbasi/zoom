import PersonalRoomInfo from '@/components/Shared/PersonalRoomInfo'
import React from 'react'

const PersonalRoomPage = () => {
  return (
    <section className="flex size-full flex-col gap-10">
    <h1 className="text-3xl font-bold">Personal-Room Page</h1>
    <PersonalRoomInfo />
  </section>
  )
}

export default PersonalRoomPage