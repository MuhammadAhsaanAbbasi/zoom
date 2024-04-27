"use client"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useState } from "react"
import MeetingSetUp from "./MeetingSetUp"
import MeetingRoom from "./MeetingRoom"
import { useGetCallById } from "@/hooks/useGetCallById"
import Loader from "../Shared/Loader"

const MeetingPageById = ({ id }: { id: string }) => {
    const { user, isLoaded } = useUser()
    const [isSetUpComplete, setIsSetUpComplete] = useState(false)

    const {call, isCallLoading} = useGetCallById(id)

    if (!isLoaded || !isCallLoading) return <Loader />
  return (
    <main className="h-screen w-full">
        <StreamCall call={call}>
            <StreamTheme>
                {!isSetUpComplete ? (
                    <MeetingSetUp />
                ) : (
                    <MeetingRoom />
                )}
            </StreamTheme>
        </StreamCall>
    </main>
  )
}

export default MeetingPageById