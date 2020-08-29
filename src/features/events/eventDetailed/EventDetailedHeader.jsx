import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

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

export default function EventDetailedHeader({event}) {
  const isMobile = window.innerWidth <= 767

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />

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
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button compact size='mini'>
          Cancel My Place
        </Button>
        
        <Button compact size='mini' color='teal'>
          JOIN THIS EVENT
        </Button>

        <Button as={Link} to={`/edit/${event.id}`} compact size='mini' color='orange' floated='right'>
          Edit Event
        </Button>
      </Segment>
    </Segment.Group>
  )
}
