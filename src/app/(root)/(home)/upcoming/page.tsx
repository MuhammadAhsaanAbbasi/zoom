import CallList from '@/components/shared/CallList'
import React from 'react'

const UpcomingMeetPage = () => {
  return (
    <section className="flex size-full flex-col gap-10">
    <h1 className="text-3xl font-bold">UpComing Meeting Page</h1>
    <CallList type="upcoming" />
  </section>
  )
}

export default UpcomingMeetPage