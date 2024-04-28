"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

const EndCallButton = () => {
    const router = useRouter()
    const call = useCall()
    const { useLocalParticipant } = useCallStateHooks()
    const LocalParticipant = useLocalParticipant()

    const isMeetingOwner = LocalParticipant && call?.state.createdBy && 
    LocalParticipant.userId === call.state.createdBy.id

    if(!isMeetingOwner) return null
  return (
    <Button
    onClick={async () => {
        await call.endCall();
        router.push("/")
    }}
    className='bg-red-500 text-white'
    >
        End Call For EveryOne
    </Button>
  )
}

export default EndCallButton