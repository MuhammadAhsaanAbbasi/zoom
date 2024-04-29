"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useRouter } from 'next/navigation'

const Table = ({title, description}: {title: string, description: string}) => (
  <div className='flex flex-col items-start gap-3 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}:</h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</h1>
  </div>
)

const PersonalRoomInfo = () => {
  const router = useRouter()
    const { user } = useUser()
    const meetingId = user?.id
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

    const client = useStreamVideoClient()
    const {call} = useGetCallById(meetingId!)
    const StartRoom = async () => {
        if(!client || !user) return

        if(!call){
          const newCall = client.call("default", meetingId!)
          await newCall.getOrCreate({
            data: {
              starts_at: new Date().toISOString()
            }
          })
        }
        router.push(`/meeting/${meetingId}?personal=true`)
    }
    
  return (
    <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title="Topic" description={`${user?.username}'s meeting room`}/>
        <Table title="Meeting ID" description={meetingId!}/>
        <Table title="Invite Link" description={meetingLink}/>
        <div className='flex gap-5'>
        <Button className='bg-blue-1'
        onClick={StartRoom}
        > 
          Start Meeting
        </Button>
        <Button className='bg-dark-3'
        onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({
            title: "Copy Link",
            description: "Invitation Link Copy",
          })
        }}
        >
          Copy Invitation
        </Button>
        </div>
    </div>
  )
}

export default PersonalRoomInfo