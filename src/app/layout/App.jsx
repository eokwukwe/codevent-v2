import React, { Fragment, useState } from 'react'

import NavBar from '../../features/nav/NavBar'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import { Container } from 'semantic-ui-react'

function App() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <NavBar setFormOpen={setFormOpen} />
      <Container className="main">
        <EventDashboard setFormOpen={setFormOpen} formOpen={formOpen} />
      </Container>
    </>
  )
}

export default App
