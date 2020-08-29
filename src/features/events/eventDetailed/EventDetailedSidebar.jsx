import React from 'react'
import { Segment, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function EventDetailedSidebar() {
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
        2 People Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          <Item style={{ position: 'relative' }}>
            <Item.Image size='mini' src='/assets/user.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h4'>
                <span>Tom</span>
              </Item.Header>
            </Item.Content>
          </Item>
          <Item style={{ position: 'relative' }}>
            <Item.Image size='mini' src='/assets/user.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h4'>
                <span>Bob</span>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </>
  )
}
