/*global google*/

import React from 'react'
import * as Yup from 'yup'
import cuid from 'cuid'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Segment, Header, Button, Grid } from 'semantic-ui-react'

import TextArea from 'app/common/form/TextArea'
import TextInput from 'app/common/form/TextInput'
import DateInput from 'app/common/form/DateInput'
import PlaceInput from 'app/common/form/PlaceInput'
import SelectInput from 'app/common/form/SelectInput'
import { categoryData } from 'app/api/categoryOptions'
import { updateEvent, createEvent } from '../eventActions'

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()

  const selectedEvent = useSelector(state =>
    state.events.events.find(event => event.id === match.params.id)
  )

  const initialValues = selectedEvent ?? {
    date: '',
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null
    },
    venue: {
      address: '',
      latLng: null
    }
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Please provide a title'),
    category: Yup.string().required('Please provide a category'),
    description: Yup.string().required('Please provide a description'),
    city: Yup.object().shape({
      address: Yup.string().required('Please provide a city')
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Please provide a venue')
    }),
    date: Yup.date().required('Please provide a date')
  })

  return (
    <Grid centered>
      <Grid.Column mobile={16} tablet={10} computer={7}>
        <Segment clearing>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
              selectedEvent
                ? dispatch(updateEvent({ ...selectedEvent, ...values }))
                : dispatch(
                    createEvent({
                      ...values,
                      id: cuid(),
                      hostedBy: 'Bob Mandy',
                      hostPhotoURL: '/assets/user.png',
                      attendees: []
                    })
                  )

              history.push('/events')
            }}
          >
            {({ values, dirty, isValid, isSubmitting }) => (
              <Form className='ui form'>
                <Header sub color='teal' content='Event Details' />

                <TextInput name='title' placeholder='Title' />

                <SelectInput options={categoryData} name='category' placeholder='Category' />

                <TextArea name='description' placeholder='Description' />

                <Header sub color='teal' content='Event Location Details' />

                <PlaceInput name='city' placeholder='City' />

                <PlaceInput
                  name='venue'
                  placeholder='Venue'
                  disabled={!values.city.latLng}
                  options={{
                    location: new google.maps.LatLng(values.city.latLng),
                    radius: 1000,
                    types: ['establishment']
                  }}
                />

                <DateInput
                  name='date'
                  placeholderText='Date'
                  timeFormat='HH:mm'
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy h:mm a'
                />

                <Button
                  size='mini'
                  type='submit'
                  floated='right'
                  positive
                  content='Submit'
                  loading={isSubmitting}
                  disabled={!isValid || !dirty || isSubmitting}
                />

                <Button
                  as={Link}
                  to='/events'
                  size='mini'
                  floated='right'
                  content='Cancel'
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
