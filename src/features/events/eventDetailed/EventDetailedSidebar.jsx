import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, List, Label, Image } from 'semantic-ui-react'

export default function EventDetailedSidebar({ attendees, hostUid }) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'}{' '}
        Going
      </Segment>
      <Segment attached>
        <List relaxed divided verticalAlign='middle'>
          {attendees &&
            attendees.map(attendee => (
              <List.Item key={attendee.id} style={{ position: 'relative' }}>
                {hostUid === attendee.id && (
                  <Label
                    color='orange'
                    ribbon='right'
                    style={{position: 'absolute'}}
                  >
                    Host
                  </Label>
                )}
                <Image
                  size='mini'
                  circular
                  src={attendee.photoURL || '/assets/user.png'} 
                />
                <List.Content>
                  <List.Header as='h4'>
                    <Link
                      to={`/profile/${attendee.id}`}
                      style={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      color: 'teal'
                    }}
                    >
                      {attendee.displayName.split(' ')[0]}
                    </Link>
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
        </List>
      </Segment>
    </>
  )
}
