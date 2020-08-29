import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import NavBar from '../../features/nav/NavBar'
import HomePage from '../../features/home/HomePage'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage'
import EventForm from '../../features/events/eventForm/EventForm'

function App() {
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/events/:id' component={EventDetailedPage} />
              <Route exact path={['/createEvent', '/edit/:id']} component={EventForm} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default App
