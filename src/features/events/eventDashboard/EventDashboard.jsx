import React, { Fragment, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import EventList from './EventList'
import { sampleData } from '../../../app/api/data'

export default function EventDashboard() {
  const [events, setEvents] = useState(sampleData)

  // function handleCreateEvent(event) {
  //   setEvents([...events, event])
  // }

  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(events.map(evt => (evt.id === updatedEvent.id ? updatedEvent : evt)))
  // }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter(evt => evt.id !== eventId))
  }

  return (
    <Fragment>
      <Grid stackable reversed='mobile' columns={2}>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={handleDeleteEvent} />
        </Grid.Column>

        <Grid.Column width={6}>
          <h2>Event Filter</h2>
        </Grid.Column>
      </Grid>

      {/* <Grid>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <h1>Another Column</h1>
        </Grid.Column>
      </Grid> */}
    </Fragment>
  )
}
