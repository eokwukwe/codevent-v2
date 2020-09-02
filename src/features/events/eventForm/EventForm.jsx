/*global google*/

import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Segment, Header, Button, Grid, Confirm } from 'semantic-ui-react'

import { toast } from 'react-toastify'
import Spinner from 'app/layout/Spinner'
import TextArea from 'app/common/form/TextArea'
import { listenToEvents } from '../eventActions'
import TextInput from 'app/common/form/TextInput'
import DateInput from 'app/common/form/DateInput'
import PlaceInput from 'app/common/form/PlaceInput'
import SelectInput from 'app/common/form/SelectInput'
import { categoryData } from 'app/api/categoryOptions'
import useFirestoreDoc from 'app/hooks/useFirestoreDoc'
import ErrorComponent from 'app/common/errors/ErrorComponent'
import {
  listenToEventFromFirestore,
  updateEventInFirestore,
  addEventToFirestore,
  cancelEventToggle
} from 'app/firestore/firestoreService'

export default function EventForm({ match, history }) {
  const dispatch = useDispatch()

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loadingCancel, setLoadingCancel] = useState(false)

  const selectedEvent = useSelector(state =>
    state.events.events.find(event => event.id === match.params.id)
  )

  const { loading, error } = useSelector(state => state.async)

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

  async function handleCancelToggle(event) {
    setConfirmOpen(false)
    setLoadingCancel(true)
    try {
      await cancelEventToggle(event)
      setLoadingCancel(false)
    } catch (error) {
      setLoadingCancel(false)
      toast.error(error.message)
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch]
  })

  if (loading) {
    return <Spinner content='Loading event...' />
  }

  if (error) return <ErrorComponent />

  return (
    <Grid centered>
      <Grid.Column mobile={16} tablet={10} computer={7}>
        <Segment clearing>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                selectedEvent
                  ? await updateEventInFirestore(values)
                  : await addEventToFirestore(values)

                setSubmitting(false)

                history.push('/events')
              } catch (error) {
                toast.error(error.message)
                setSubmitting(false)
              }
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

                {selectedEvent && (
                  <Button
                    size='mini'
                    type='button'
                    floated='left'
                    color={selectedEvent.isCancelled ? 'green' : 'red'}
                    content={selectedEvent.isCancelled ? 'Reactivate' : 'Cancel Event'}
                    onClick={() => setConfirmOpen(true)}
                    loading={loadingCancel}
                  />
                )}

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
          <Confirm
            content={
              selectedEvent?.isCancelled
                ? 'This will reactivate the event - are you sure?'
                : 'This will cancel the event - are you sure?'
            }
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => handleCancelToggle(selectedEvent)}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
