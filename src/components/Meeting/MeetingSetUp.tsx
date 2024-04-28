"use client"
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const MeetingSetUp = ({setIsSetUpComplete}: {setIsSetUpComplete: (values: boolean) => void}) => {
    const call = useCall();

    if (!call) {
      throw new Error(
        'useStreamCall must be used within a StreamCall component.',
      );
    }
  
    // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
    const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  
    useEffect(() => {
      if (isMicCamToggled) {
        call?.camera.disable()
        call?.microphone.disable();
      } else {
        call?.camera.enable();
        call?.microphone.enable();
      }
    }, [isMicCamToggled, call?.camera, call?.microphone]);
    return (
      <div className="flex h-screen w-ful flex-col items-center justify-center gap-3 text-white">
        <h1 className="text-center text-2xl font-bold">Setup</h1>
        <VideoPreview className='' />
        <div className="flex h-14 items-center justify-center gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isMicCamToggled}
              onChange={(e) => setIsMicCamToggled(e.target.checked)}
            />
            Join with mic and camera off
          </label>
          <DeviceSettings />
        </div>
        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();
  
            setIsSetUpComplete(true);
          }}
        >
          Join meeting
        </Button>
      </div>
  )
}

export default MeetingSetUp