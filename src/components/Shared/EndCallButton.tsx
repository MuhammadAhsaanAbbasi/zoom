"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { addPrevious } from '@/lib/actions/previous.actions'

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant, useCallCustomData } = useCallStateHooks();
  const LocalParticipant = useLocalParticipant();
  const callData = useCallCustomData();
  const isMeetingOwner =
      LocalParticipant && call?.state.createdBy && LocalParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  // Obtain the creation date from the call state
  const createdAt = call?.state?.createdAt;

  // Ensure the call state and creation date exist before proceeding
  if (!createdAt) return null;

  // Extract the necessary information
  const date = new Date(createdAt);
  const userId = call.state.createdBy.id;
  const description = callData.description;

  const CallEnded = async () => {
      const previousData = {
          description: description,
          date: date,
      };
      try {
          const newPrevious = await addPrevious({
              previous: previousData,
              userId: userId,
          });
          if (newPrevious) {
              await call.endCall();
              console.log("call ended", previousData);
              router.push("/");
              router.refresh();
          }
      } catch (error) {
          console.error(error);
      }
  };

  return (
      <Button
          onClick={async () => {
              await CallEnded();
          }}
          className="bg-red-500 text-white"
      >
          End Call For Everyone
      </Button>
  );
};

export default EndCallButton;
