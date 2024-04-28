import MeetingPageById from '@/components/Meeting/MeetingPageById'
import React from 'react'

interface IProps {
    params: {
        id: string
    }
}

const MeetingPage = ({params: {id}}: IProps) => {
  return <MeetingPageById id={id} />
}

export default MeetingPage