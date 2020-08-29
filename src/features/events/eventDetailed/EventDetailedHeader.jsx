import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'

const eventImageStyle = {
  filter: 'brightness(30%)'
}

const eventImageTextStyle = {
  // position: 'absolute',
  // bottom: '5%',
  // left: '5%',
  // width: '100%',
  // height: 'auto',
  // color: 'white'
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: 'auto',
  color: 'white'
}

export default function EventDetailedHeader() {
  const isMobile = window.innerWidth <= 767

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/drinks.jpg`} fluid style={eventImageStyle} />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content='Event Title'
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontSize: isMobile ? '1.5rem' : '2rem'
                  }}
                />
                <p>Event Date</p>
                <p>
                  Hosted by <strong>Bob</strong>
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

        <Button compact size='mini' color='orange' floated='right'>
          Edit Event
        </Button>
      </Segment>
    </Segment.Group>
  )
}
