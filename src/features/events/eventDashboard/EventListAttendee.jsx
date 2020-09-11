import React from 'react'
import { Link } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'

export default function EventListAttendee({ attendee }) {
  return (
    <List.Item>
      <Image
        as={Link}
        circular
        size='mini'
        to={`/profile/${attendee.id}`}
        src={attendee.photoURL || '/assets/user.png'}
      />
    </List.Item>
  )
}
