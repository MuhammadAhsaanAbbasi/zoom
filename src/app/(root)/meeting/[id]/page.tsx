import React from 'react'

interface IProps {
    params: {
        id: number
    }
}

const MeetingPage = ({params: {id}}: IProps) => {
  return (
    <div>MeetingPage { id }</div>
  )
}

export default MeetingPage