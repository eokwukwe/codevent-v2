import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedSidebar from './EventDetailedSidebar'

export default function EventDetailedPage({ match }) {
  const event = useSelector(state => state.events.events.find(event => event.id === match.params.id))

  return (
    <Grid stackable reversed='mobile' columns={2}>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  )
}
