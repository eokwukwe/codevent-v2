import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import EventList from './EventList'
import EventFilters from './EventFilters'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import { getEvents, dataFromSnapshot } from 'app/firestore/firestoreService'
import { listenToEvents } from '../eventActions'
import { asyncActionStart, asyncActionFinish, asyncActionError } from 'app/async/asyncReducer'

export default function EventDashboard() {
  const dispatch = useDispatch()
  const { events } = useSelector(state => state.events)
  const { loading } = useSelector(state => state.async)

  useEffect(() => {
    dispatch(asyncActionStart())

    const unsubscribe = getEvents({
      next: snapshot => {
        dispatch(listenToEvents(snapshot.docs.map(doc => dataFromSnapshot(doc))))
        dispatch(asyncActionFinish())
      },
      error: error => {
        console.log(error)
        dispatch(asyncActionError(error))
      },
      complete: () => console.log('You will never see this message')
    })

    return unsubscribe
  }, [dispatch])

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
