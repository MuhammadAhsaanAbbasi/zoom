"use client"
import React, { useState } from 'react'
import HomeCard from '../Shared/HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from '../ui/use-toast'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import ReactDatePicker from "react-datepicker"

const MeetingList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    'isInstanceMeeting' | "isScheduleMeeting" | "isJoinMeeting" | undefined>(undefined)

  const { user } = useUser()
  const client = useStreamVideoClient()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  })

  const [callDetail, setCallDetail] = useState<Call>();

  const CreateMeeting = async () => {
    if (!client || !user) return
    try {
      if (!values.dateTime) {
        toast({
          title: "Error",
          description: "Please Select a Date",
        })
        return
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');

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
      setCallDetail(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}/`)
      }
      toast({
        title: "Success",
        description: "Meeting Created",
      })

    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Something went wrong",
      })
    }
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`
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

{!callDetail ? (
        <MeetingModel
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={CreateMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <Label className="text-base font-normal leading-[22.4px] text-sky-2"
            htmlFor="message"
            >
              Add a description
            </Label>
            <Textarea 
            placeholder="Type your message here." 
            id="message"
            className='w-full text-sky-2 rounded border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
          </div>

          <div className='flex flex-col gap-2.5'>
          <Label className="text-base font-normal leading-[22.4px] text-sky-2"
            htmlFor="dateTime"
            >
              Select Date & Time
            </Label>
            <ReactDatePicker 
            selected={values.dateTime}
            onChange={(date) => setValues({ ...values, dateTime: date! })}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat="MMMM d, yyyy h:mm aa"
            className='w-full bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title={"Meeting Created"}
          className='text-center'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Success",
              description: "Meeting Link Copied",
            })
          }}
          buttonIcon='/icons/copy.svg'
          image='/icons/checked.svg'
          buttonText='Copy Meeting Link'
        />
      )}


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