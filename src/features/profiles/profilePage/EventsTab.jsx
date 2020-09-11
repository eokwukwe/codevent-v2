import React, { useState } from 'react'

import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header, Tab, Card, Image, Icon } from 'semantic-ui-react'

import { listenToUserEvents } from '../profileActions'
import { getUserEventsQuery } from 'app/firestore/firestoreService'
import useFirestoreCollection from 'app/hooks/useFirestoreCollection'

export default function EventsTab({ profile, breakPoint }) {
  const xtraSmall = breakPoint <= 520
  const small = breakPoint > 520 && breakPoint <= 991

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(0)

  const { profileEvents } = useSelector(state => state.profile)
  const {loading} = useSelector(state => state.async)
  
  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, profile.id),
    data: events => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id]
  })

  const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
  ]

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content='Events' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
          />
          <Card.Group itemsPerRow={xtraSmall ? 2 : small ? 3 : 4} style={{ marginTop: 10 }}>
            {profileEvents.map(evt => (
              <Card as={Link} to={`/events/${evt.id}`} key={evt.id}>
                <Image
                  src={`/assets/categoryImages/${evt.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header
                    style={{ fontSize: '1rem' }}
                    textAlign='left'
                  >
                    {evt.title}
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <span style={{ fontSize: '0.6rem', marginRight: '0.6rem' }}>
                    <Icon name='calendar times' /> {format(evt.date, 'dd MMM yyyy')}
                  </span>
                  <span style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                    <Icon name='time' /> {format(evt.date, 'h:mm a')}
                  </span>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
