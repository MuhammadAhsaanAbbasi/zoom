import CallList from '@/components/shared/CallList'
import React from 'react'

const RecordingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-10">
    <h1 className="text-3xl font-bold">Recording Page</h1>
    <CallList  type="recordings" />
  </section>
  )
}

export default RecordingsPage