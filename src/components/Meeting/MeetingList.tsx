"use client"
import React, { useState } from 'react'
import HomeCard from '../Shared/HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'

const MeetingList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    'isInstanceMeeting' | "isScheduleMeeting" | "isJoinMeeting" | undefined>(undefined)
  
  const CreateMeeting = () => {
    console.log("Create Meeting")
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