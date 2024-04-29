import CallList from '@/components/Shared/CallList'
import React from 'react'

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10">
    <h1 className="text-3xl font-bold">Previous Page</h1>
    <CallList type="ended" />
  </section>
  )
}

export default PreviousPage