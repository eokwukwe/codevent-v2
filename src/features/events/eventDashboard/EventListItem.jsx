import React from 'react'
import { format } from 'date-fns/esm'
import { Link } from 'react-router-dom'
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react'

import EventListAttendee from './EventListAttendee'
import { deleteEventInFirestore } from 'app/firestore/firestoreService'

export default function EventListItem({ event }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group unstackable>
          <Item>
            <Item.Image
              size='tiny'
              circular src={event.hostPhotoURL || '/assets/user.png'}
            />

            <Item.Content verticalAlign='middle'>
              <Item.Header content={event.title} />
              <Item.Description>
                Hosted by {' '}
                <Link
                  to={`/profile/${event.hostUid}`}
                  style={{
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    color: 'teal'
                  }}
                >
                  {event.hostedBy}
                </Link>
              </Item.Description>
              {event.isCancelled && (
                <Label
                  style={{top: '-40px'}}
                  ribbon='right'
                  color='red'
                  content='Event cancelled'
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')} <Icon name='marker' />{' '}
          {event.venue.address}
        </span>
      </Segment>

      <Segment secondary>
        <List horizontal>
          {event.attendees &&
            event.attendees.map(attendee => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
        </List>
      </Segment>

      <Segment clearing>
        <div>{event.description}</div>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          size='mini'
          color='teal'
          floated='right'
          content='View'
          style={{ marginLeft: '0.6rem' }}
        />
        <Button
          onClick={() => deleteEventInFirestore(event.id)}
          size='mini'
          color='red'
          floated='right'
          content='Delete'
        />
      </Segment>
    </Segment.Group>
  )
}
