import React, { Fragment, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import EventForm from '../eventForm/EventForm'
import { sampleData } from '../../../app/api/data'

export default function EventDashboard({ formOpen, setFormOpen }) {
  const [events, setEvents] = useState(sampleData)

  return (
    <Fragment>
      <Grid stackable reversed='mobile' columns={2}>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>

        <Grid.Column width={6}>{formOpen && <EventForm setFormOpen={setFormOpen} />}</Grid.Column>
      </Grid>

      {/* <Grid>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <h1>Another Column</h1>
        </Grid.Column>
      </Grid> */}
    </Fragment>
  )
}
