import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import EventList from './EventList'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilters from './EventFilters'

export default function EventDashboard() {
  const { events } = useSelector(state => state.events)
  const { loading } = useSelector(state => state.async)

  // function handleCreateEvent(event) {
  //   setEvents([...events, event])
  // }

  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(events.map(evt => (evt.id === updatedEvent.id ? updatedEvent : evt)))
  // }

  function handleDeleteEvent(eventId) {
    // setEvents(events.filter(evt => evt.id !== eventId))
  }

  return (
    <>
      <Grid stackable reversed='mobile' columns={2}>
        <Grid.Column width={10}>
          {loading && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )}
          <EventList events={events} deleteEvent={handleDeleteEvent} />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventFilters />
        </Grid.Column>
      </Grid>
      {/* <Grid>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <h1>Another Column</h1>
        </Grid.Column>
      </Grid> */}
    </>
  )
}
