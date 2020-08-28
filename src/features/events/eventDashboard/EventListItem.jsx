import React from 'react'
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'

export default function EventListItem() {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group unstackable>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />

            <Item.Content verticalAlign="middle">
              <Item.Header content="Event Title" />
              <Item.Description>Hosted by Bovb</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" /> Date
          <Icon name="marker" /> Venu
        </span>
      </Segment>

      <Segment secondary>
        <List horizontal>
          <EventListAttendee />
          <EventListAttendee />
          <EventListAttendee />
        </List>
      </Segment>

      <Segment clearing>
        <div>Description</div>
        <Button size="mini" color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  )
}
