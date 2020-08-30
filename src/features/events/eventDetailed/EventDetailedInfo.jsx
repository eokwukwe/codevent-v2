import React from 'react'
import { format } from 'date-fns'
import { Segment, Button, Icon, List } from 'semantic-ui-react'

export default function EventDetailedInfo({ event }) {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <List divided verticalAlign='middle'>
          <List.Item style={{ padding: '1rem 0' }}>
            <Icon size='large' color='teal' name='info' />
            <List.Content>
              <List.Description>
                <p>{event.description}</p>
              </List.Description>
            </List.Content>
          </List.Item>

          <List.Item style={{ padding: '1rem 0' }}>
            <Icon size='large' color='teal' name='calendar' />
            <List.Content>
              <List.Description>
                <span>{format(event.date, 'MMMM d, yyyy h:mm a')}</span>
              </List.Description>
            </List.Content>
          </List.Item>

          <List.Item style={{ padding: '1rem 0' }}>
            <List.Content floated='right'>
              <Button
                color='teal'
                compact
                size='mini'
                content='Show Map'
                // content={isMapOpen ? 'Hide Map' : 'Show Map'}
              />
            </List.Content>
            <Icon size='large' color='teal' name='marker' />
            <List.Content>
              <List.Description>
                <span>{event.venue.address}</span>
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </Segment.Group>
  )
}
