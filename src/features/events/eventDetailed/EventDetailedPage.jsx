import React from 'react'
import {Grid} from 'semantic-ui-react'

import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedSidebar from './EventDetailedSidebar'

export default function EventDetailedPage() {
  return (
    <Grid stackable reversed='mobile' columns={2}>
      <Grid.Column width={10}>
        <EventDetailedHeader />
        <EventDetailedInfo />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  )
}
