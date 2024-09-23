"use client"
import { getUserPrevious } from "@/lib/actions/previous.actions"
import { getUserUpComing } from "@/lib/actions/upcoming.actions"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [endedCalls, setEndedCalls] = useState<getCallParamas[] | undefined>()

    const [upcomingCalls, setUpcomingCalls] = useState<getCallParamas[] | undefined>()

    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const LoadCalls = async () => {
            if (!client || !user?.id) return;
            setIsLoading(true)
            
            try {
                const {calls} = await client.queryCalls({
                    sort: [{field: "starts_at", direction: -1}],
                    filter_conditions:{
                        starts_at: {$exists: true},
                    $or: [
                        {created_by_user_id: user?.id},
                        {members: {$in: [user?.id]}}
                    ]
                }
                })
            setCalls(calls)

            const previous = await getUserPrevious(user?.id)
            console.log(previous?.data)
            setEndedCalls(previous?.data)
            const upcoming = await getUserUpComing(user?.id)
            console.log(upcoming?.data)
            setUpcomingCalls(upcoming?.data)
            } catch (error) {
                console.error(error)
            }finally {
                setIsLoading(false)
            }
        }
        LoadCalls()
    }, [client, user?.id])

    return {
        endedCalls,
        upcomingCalls,
        CallRecordings: calls,
        isLoading
    }
}