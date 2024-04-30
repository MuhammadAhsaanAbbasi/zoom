'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';

import { useGetCalls } from '../../../hooks/useGetCall'
import React, { useEffect, useState } from 'react'
import MeetingCard from '../Meeting/MeetingCard'
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { deletePrevious } from '@/lib/actions/previous.actions';
import { deleteUpcoming } from '@/lib/actions/upcoming.actions';
import { toast } from '../ui/use-toast';

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

    const formatDateTime = (dateTime: string | Date | undefined) => {
        if (!dateTime) return "No Date";
    
        let dateObject: Date;
    
        if (dateTime instanceof Date) {
            dateObject = dateTime;
        } else {
            dateObject = new Date(dateTime);
        }
    
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
    
        return dateObject.toLocaleString('en-US', options);
    };
    

    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()

    if(isLoading) return <Loader />
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {calls && calls.length > 0 ? calls.map((meeting: getCallParamas | CallRecording) => (
                <MeetingCard
                key={(meeting as getCallParamas)._id}
                    icon={type === "ended" ? "/icons/previous.svg" : type === "upcoming" ? "/icons/upcoming.svg" : "/icons/recordings.svg"}
                    title={
                        (meeting as getCallParamas).description?.substring(0, 25) || 
                        (meeting as CallRecording).filename?.substring(0, 25) || 
                        "No Description"
                    }
                    date={
                        formatDateTime((meeting as getCallParamas).date) ||
                        (meeting as CallRecording).start_time?.toLocaleString()
                    }
                    isPreviousMeeting={type === "ended"}
                    isRecordings={type === "recordings"}
                    buttonIcon1={
                        type === "recordings" ? "/icons/play.svg" : undefined
                    }
                    buttonText={type === "recordings" ? "Play" : "Start"}
                    link={type === "recordings" ? 
                    (meeting as CallRecording).url : (meeting as getCallParamas).link as string }
                    handleClick={
                        type === "recordings" ?  
                        () => router.push((meeting as CallRecording).url) :
                        () => router.push(`/meeting/${(meeting as getCallParamas).call_id}`)
                    }
                    deleteClick={
                        type === "ended" ?
                        async () => {
                            await deletePrevious((meeting as getCallParamas)._id)
                            toast({
                                title: "Success",
                                description: "Previous Meeting Deleted"
                            })
                            router.refresh()
                        } : 
                        async () =>{
                        await  deleteUpcoming((meeting as getCallParamas)._id)
                        toast({
                            title: "Success",
                            description: "UpComing Meeting Deleted"
                        })
                        router.refresh()
                    }
                    }
                />
            )) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    )
}

export default CallList