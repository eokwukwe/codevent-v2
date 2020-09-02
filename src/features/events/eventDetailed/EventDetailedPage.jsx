import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import Spinner from 'app/layout/Spinner'
import { listenToEvents } from '../eventActions'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedHeader from './EventDetailedHeader'
import useFirestoreDoc from 'app/hooks/useFirestoreDoc'
import EventDetailedSidebar from './EventDetailedSidebar'
import ErrorComponent from 'app/common/errors/ErrorComponent'
import { listenToEventFromFirestore } from 'app/firestore/firestoreService'

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch()

  const event = useSelector(state =>
    state.events.events.find(event => event.id === match.params.id)
  )

  const { loading, error } = useSelector(state => state.async)

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch]
  })

  if (loading || (!event && !error)) {
    return <Spinner content='Loading event...' />
  }

  if (error) return <ErrorComponent />

  return (
    <Grid stackable reversed='mobile' columns={2}>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  )
}
