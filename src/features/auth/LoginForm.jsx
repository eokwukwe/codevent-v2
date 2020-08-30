import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { signInUser } from './authActions'
import TextInput from 'app/common/form/TextInput'
import ModalWrapper from 'app/common/modals/ModalWrapper'
import { closeModal } from 'app/common/modals/modalReducer'

export default function LoginForm() {
  const dispatch = useDispatch()

  return (
    <ModalWrapper size='mini' header='Sign in to CodEvent'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required()
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values))
          setSubmitting(false)
          dispatch(closeModal())
        }}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form className='ui form'>
            <TextInput name='email' placeholder='Enter your email' />

            <TextInput name='password' placeholder='Enter your password' />

            <Button
              fluid
              size='large'
              color='teal'
              type='submit'
              content='Login'
              loading={isSubmitting}
              disabled={!dirty || !isValid || isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
