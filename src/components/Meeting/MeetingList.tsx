"use client"
import React, { useState } from 'react'
import HomeCard from '../Shared/HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'

const MeetingList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    'isInstanceMeeting' | "isScheduleMeeting" | "isJoinMeeting" | undefined>(undefined)
  
  const {user} = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  })

  const [callDetails, setCallDetails] = useState<Call>()

  const CreateMeeting = async () => {
    if(!client || !user) return
    try {
      const id = crypto.randomUUID()
      const call = client.call("default",id)

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || "Instant Meeting"

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          }
        },
      })
    console.log("call created", call)
    setCallDetails(call);

    if(!values.description){
      router.push(`/meeting/${call.id}/`)
    }
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img={"/icons/add-meeting.svg"}
        title={"New Meeting"}
        description={"SetUp ä New Recording"}
        className='bg-orange-1'
        handleClick={() => setMeetingState("isInstanceMeeting")}
      />
      <HomeCard
        img={"/icons/schedule.svg"}
        title={"Schedule Meeting"}
        description={"Plan Your Meeting"}
        className='bg-blue-1'
        handleClick={() => { setMeetingState("isScheduleMeeting") }}
      />
      <HomeCard
        img={"/icons/join-meeting.svg"}
        title={"Join Meeting"}
        description={"Via Invitation Link"}
        className='bg-purple-1'
        handleClick={() => { setMeetingState("isJoinMeeting") }}
      />
      <HomeCard
        img={"/icons/recordings.svg"}
        title={"View Recordings"}
        description={"Meeting Recordings"}
        className='bg-yellow-1'
        handleClick={() => router.push("/recordings")}
      />
      
      <MeetingModel 
      isOpen={meetingState === "isInstanceMeeting"}
      onClose={() => setMeetingState(undefined)}
      title={"Start an Instant Meeting"}
      className='text-center'
      buttonText='Start Meeting'
      handleClick={CreateMeeting}
      />
    </section>
  )
}

export default MeetingList