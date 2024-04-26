"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from '../Shared/HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'

const MeetingList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    'isInstanceMeeting' | "isScheduleMeeting" | "isJoinMeeting" | undefined>(undefined)
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img={"/icons/add-meeting.svg"}
        title={"New Meeting"}
        description={"SetUp a new recording"}
        className='bg-orange-1'
        handleClick={() => { setMeetingState("isInstanceMeeting") }}
      />
      <HomeCard
        img={"/icons/schedule.svg"}
        title={"Schedule Meeting"}
        description={"Plan your meeting"}
        className='bg-blue-1'
        handleClick={() => { setMeetingState("isScheduleMeeting") }}
      />
      <HomeCard
        img={"/icons/join-meeting.svg"}
        title={"Join Meeting"}
        description={"SetUp a new recording"}
        className='bg-purple-1'
        handleClick={() => { setMeetingState("isInstanceMeeting") }}
      />
      <HomeCard
        img={"/icons/recordings.svg"}
        title={"View Recordings"}
        description={"Meeting recordings"}
        className='bg-yellow-1'
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModel />
    </section>
  )
}

export default MeetingList