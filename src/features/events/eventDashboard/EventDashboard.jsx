import React, { Fragment, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import EventForm from '../eventForm/EventForm'
import { sampleData } from '../../../app/api/data'

export default function EventDashboard({ formOpen, setFormOpen, selectEvent, selectedEvent }) {
  const [events, setEvents] = useState(sampleData)

  function handleCreateEvent(event) {
    setEvents([...events, event])
  }

  function handleUpdateEvent(updatedEvent) {
    setEvents(events.map(evt => (evt.id === updatedEvent.id ? updatedEvent : evt)))
    selectEvent(null)
  }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter(evt => evt.id !== eventId))
  }

  return (
    <Fragment>
      <Grid stackable reversed='mobile' columns={2}>
        <Grid.Column width={10}>
          <EventList events={events} selectEvent={selectEvent} deleteEvent={handleDeleteEvent} />
        </Grid.Column>

        <Grid.Column width={6}>
          {formOpen && (
            <EventForm
              setFormOpen={setFormOpen}
              setEvents={setEvents}
              createEvent={handleCreateEvent}
              selectedEvent={selectedEvent}
              updateEvent={handleUpdateEvent}
              key={selectedEvent ? selectedEvent.id : null}
            />
          )}
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
