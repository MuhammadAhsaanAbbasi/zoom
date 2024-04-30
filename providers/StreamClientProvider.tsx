"use client"
import { useUser } from "@clerk/nextjs"
import {StreamVideoClient, StreamVideo} from "@stream-io/video-react-sdk"

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY

import React, { useEffect, useState } from 'react'
import { tokenProvider } from "@/lib/actions/stream.actions"
import Loader from "@/components/Shared/Loader"

const StreamVideoProvider = ({children}: {children: React.ReactNode}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()
    const {isLoaded, user} = useUser()
    
    useEffect(() => {
        if(!isLoaded || !user) return;
        if(!apikey) return;
        const client = new StreamVideoClient({
            apiKey: apikey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl
            },
            tokenProvider:tokenProvider
        }) 

        setVideoClient(client)

    }, [isLoaded, user])

    if(!videoClient) return <Loader />
  return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  )
}

export default StreamVideoProvider