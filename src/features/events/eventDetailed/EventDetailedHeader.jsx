import React, { useState } from 'react'

import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { addUserAttendance, cancelUserAttendance } from 'app/firestore/firestoreService'

const eventImageStyle = {
  filter: 'brightness(30%)'
}

const eventImageTextStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: 'auto',
  color: 'white'
}

export default function EventDetailedHeader({ event, isGoing, isHost }) {
  const isMobile = window.innerWidth <= 767

  const [loading, setLoading] = useState(false)

  async function handleUserJoinEvent() {
    setLoading(true)
    try {
      await addUserAttendance(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true)
    try {
      await cancelUserAttendance(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          fluid
          style={eventImageStyle}
          src={`/assets/categoryImages/${event.category}.jpg`}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.title}
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontSize: isMobile ? '1.5rem' : '2rem'
                  }}
                />
                <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                <p>
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
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment clearing attached='bottom'>
        {!isHost && (
          <>
            {isGoing ? (
              <Button
                compact
                size='mini'
                color='orange'
                loading={loading}
                onClick={handleUserLeaveEvent}
              >
                Cancel My Place
              </Button>
            ) : (
              <Button
              compact
              size='mini'
              color='teal'
              loading={loading}
              onClick={handleUserJoinEvent}
              >
                JOIN THIS EVENT
              </Button>
            )}
          </>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/edit/${event.id}`}
            compact
            size='mini'
            color='orange'
            floated='right'
          >
            Edit Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  )
}
