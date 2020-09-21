import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import EventList from './EventList'
import EventFilters from './EventFilters'
import { listenToEvents } from '../eventActions'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import useFirestoreCollection from 'app/hooks/useFirestoreCollection'
import { listenToEventsFromFirestore } from 'app/firestore/firestoreService'

export default function EventDashboard() {
  const dispatch = useDispatch()

  const [predicate, setPredicate] = useState(
    new Map([
      ['startDate', new Date()],
      ['filter', 'all']
    ])
  )

  const { events } = useSelector(state => state.events)
  const { loading } = useSelector(state => state.async)

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: events => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate]
  })

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)))
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
          <EventList events={events} />
        </Grid.Column>

        <Grid.Column width={6}>
            <EventFilters
              loading={loading}
              predicate={predicate}
              setPredicate={handleSetPredicate}
            />
        </Grid.Column>
        {/* <Grid.Column width={6}>
          <div className='ui fixed top sticky' style={{top: '75px'}}>
            <EventFilters
              loading={loading}
              predicate={predicate}
              setPredicate={handleSetPredicate}
            />
          </div>
        </Grid.Column> */}
      </Grid>
      {/* <Grid>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <h1>Another Column</h1>
        </Grid.Column>
      </Grid> */}
    </>
  )
}
