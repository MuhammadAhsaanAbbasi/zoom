'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import { useGetCalls } from '../../../hooks/useGetCall'
import React, { useEffect, useState } from 'react'
import MeetingCard from '../Meeting/MeetingCard'
import { useRouter } from 'next/navigation';
import Loader from './Loader';

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
    const router = useRouter()
    const { endedCalls, upcomingCalls, CallRecordings, isLoading } = useGetCalls()
    const [recording, setRecordings] = useState<CallRecording[]>([])

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(CallRecordings.map(
                    (meeting) => meeting.queryRecordings()))
                
                    const recordings = callData
                        .filter(call => call.recordings.length > 0)
                        .flatMap(call => call.recordings)
                
                setRecordings(recordings)
            } catch (error) {
                console.error(error)
            }
        }

        if(type === "recordings") fetchRecordings()
    }, [type, CallRecordings]);

    const getCalls = () => {
        switch (type) {
            case "ended":
                return endedCalls
            case "upcoming":
                return upcomingCalls
            case "recordings":
                return recording;
            default:
                return []
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case "ended":
                return "No ended calls"
            case "upcoming":
                return "No upcoming calls"
            case "recordings":
                return "No Recordings Available";
            default:
                return ""
        }
    }

    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()

    if(isLoading) return <Loader />
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording) => (
                <MeetingCard
                key={(meeting as Call).id}
                    icon={type === "ended" ? "/icons/previous.svg" : type === "upcoming" ? "/icons/upcoming.svg" : "/icons/recordings.svg"}
                    title={
                        (meeting as Call).state?.custom?.description?.substring(0, 25) || 
                        (meeting as CallRecording).filename?.substring(0, 25) || 
                        "No Description"
                    }
                    date={
                        (meeting as Call).state?.startsAt?.toLocaleString() ||
                        (meeting as CallRecording).start_time?.toLocaleString()
                    }
                    isPreviousMeeting={type === "ended"}
                    buttonIcon1={
                        type === "recordings" ? "/icons/play.svg" : undefined
                    }
                    buttonText={type === "recordings" ? "Play" : "Start"}
                    link={type === "recordings" ? 
                    (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}` }
                    handleClick={
                        type === "recordings" ?  
                        () => router.push((meeting as CallRecording).url) :
                        () => router.push(`/meeting/${(meeting as Call).id}`)
                    }
                />
            )) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    )
}

export default CallList