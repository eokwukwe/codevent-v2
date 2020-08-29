import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, List, Label, Image } from 'semantic-ui-react'

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
        <List relaxed divided verticalAlign='middle'>
          <List.Item key={1} style={{ position: 'relative' }}>
            <Label style={{ position: 'absolute' }} color='orange' ribbon='right'>
              Host
            </Label>
            <Image size='mini' circular src='/assets/user.png' />
            <List.Content>
              <List.Header as='h4'>
                <Link to={'/#'}>Tom</Link>
              </List.Header>
            </List.Content>
          </List.Item>

          <List.Item key={1} style={{ position: 'relative' }}>
            <Image size='mini' circular src='/assets/user.png' />
            <List.Content>
              <List.Header as='h4'>
                <Link to={'/#'}>Bob</Link>
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    </>
  )
}
