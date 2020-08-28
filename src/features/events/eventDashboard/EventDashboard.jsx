import React, { Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'

export default function EventDashboard() {
  return (
    <Fragment>
      <Grid stackable reversed="mobile" columns={2}>
        <Grid.Column width={10}>
          <EventList />
        </Grid.Column>

        <Grid.Column width={6}>
          <h1>Right Column</h1>
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
