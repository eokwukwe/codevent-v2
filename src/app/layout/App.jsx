import React from 'react'
import { Container } from 'semantic-ui-react'
import {ToastContainer} from 'react-toastify'
import { Route, useLocation } from 'react-router-dom'

import HomePage from 'features/home/HomePage'
import ViewContainer from 'features/nav/ViewContainer'
import ModalManager from 'app/common/modals/ModalManager'
import EventForm from 'features/events/eventForm/EventForm'
import EventDashboard from 'features/events/eventDashboard/EventDashboard'
import EventDetailedPage from 'features/events/eventDetailed/EventDetailedPage'

function App() {
  const { key } = useLocation()

  return (
    <>
      <ModalManager />
      <ToastContainer
        position='bottom-right'
        hideProgressBar
      />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            {/* <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventDashboard} />
              <Route exact path='/events/:id' component={EventDetailedPage} />
              <Route exact path={['/createEvent', '/edit/:id']} component={EventForm} />
            </Container> */}
            <ViewContainer>
              <Container className='main'>
                <Route exact path='/events' component={EventDashboard} />
                <Route exact path='/events/:id' component={EventDetailedPage} />
                <Route exact path={['/createEvent', '/edit/:id']} component={EventForm} key={key} />
              </Container>
            </ViewContainer>
          </>
        )}
      />
    </>
  )
}

export default App
