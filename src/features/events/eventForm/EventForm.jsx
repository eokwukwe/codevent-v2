import React, { useState } from 'react'
import cuid from 'cuid'
import {Link} from 'react-router-dom'
import { Segment, Header, Form, Button, Grid } from 'semantic-ui-react'

export default function EventForm({
  setFormOpen,
  createEvent,
  selectedEvent,
  updateEvent
}) {
  const initialValues = selectedEvent ?? {
    date: '',
    city: '',
    title: '',
    venue: '',
    category: '',
    description: ''
  }
  const [values, setValues] = useState(initialValues)

  function handleInputChange(e) {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  function handleFormSubmit() {
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : createEvent({
          ...values,
          id: cuid(),
          hostedBy: 'Bob Mandy',
          hostPhotoURL: '/assets/user.png',
          attendees: []
        })

    setFormOpen(false)
  }

  return (
    <Grid centered>
      <Grid.Column mobile={16} tablet={10} computer={7}>
        <Segment clearing>
          <Header content={selectedEvent ? 'Edit Event' : 'Create Event'} />

          <Form onSubmit={handleFormSubmit}>
            <Form.Field>
              <input
                type='text'
                value={values.title}
                name='title'
                placeholder='Title'
                onChange={handleInputChange}
              />
            </Form.Field>

            <Form.Field>
              <input
                type='text'
                value={values.category}
                name='category'
                placeholder='Category'
                onChange={handleInputChange}
              />
            </Form.Field>

            <Form.Field>
              <input
                type='text'
                value={values.description}
                name='description'
                placeholder='Description'
                onChange={handleInputChange}
              />
            </Form.Field>

            <Form.Field>
              <input
                type='text'
                value={values.city}
                name='city'
                placeholder='City'
                onChange={handleInputChange}
              />
            </Form.Field>

            <Form.Field>
              <input
                type='text'
                value={values.venue}
                name='venue'
                placeholder='Venue'
                onChange={handleInputChange}
              />
            </Form.Field>

            <Form.Field>
              <input
                type='date'
                value={values.date}
                name='date'
                placeholder='Date'
                onChange={handleInputChange}
              />
            </Form.Field>

            <Button size='mini' type='submit' floated='right' positive content='Submit' />

            <Button as={Link} to='/events' size='mini' floated='right' content='Cancel' />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
