import React, { useState } from 'react'

import NavBar from '../../features/nav/NavBar'
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import { Container } from 'semantic-ui-react'

function App() {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  
   function handleSelectedEvent(event) {
     setSelectedEvent(event)
     setFormOpen(true)
   }
  
  function handleCreateFormOpen() {
    setSelectedEvent(null)
    setFormOpen(true)
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className='main'>
        <EventDashboard
          setFormOpen={setFormOpen}
          formOpen={formOpen}
          selectedEvent={selectedEvent}
          selectEvent={handleSelectedEvent}
        />
      </Container>
    </>
  )
}

export default App
