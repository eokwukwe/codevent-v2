import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Label, Divider } from 'semantic-ui-react'

import SocialLogin from './SocialLogin'
import TextInput from 'app/common/form/TextInput'
import ModalWrapper from 'app/common/modals/ModalWrapper'
import { closeModal } from 'app/common/modals/modalReducer'
import { registerInFirebase } from 'app/firestore/firebaseService'

export default function SignupForm() {
  const dispatch = useDispatch()

  return (
    <ModalWrapper size='tiny' header='Register to CodEvent'>
      <Formik
        initialValues={{ displayName: '', email: '', password: '' }}
        validationSchema={Yup.object({
          displayName: Yup.string().required('Name is require'),
          email: Yup.string().required().email(),
          password: Yup.string().required()
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values)
            setSubmitting(false)
            dispatch(closeModal())
          } catch (error) {
            setErrors({ auth: error.message })
            setSubmitting(false)
          }
        }}
      >
        {({ dirty, isValid, isSubmitting, errors }) => (
          <Form className='ui form'>
            <TextInput
              name='displayName'
              placeholder='Enter your name (firstname lastname)'
            />

            <TextInput
              type='email'
              name='email'
              placeholder='Enter your email'
            />

            <TextInput
              type='password'
              name='password'
              placeholder='Enter your password'
            />

            {errors.auth && (
              <Label
                basic color='red'
                content={errors.auth}
                style={{marginBottom: 10}}
              />
            )}

            <Button
              fluid
              size='large'
              color='teal'
              type='submit'
              content='Register'
              loading={isSubmitting}
              disabled={!dirty || !isValid || isSubmitting}
            />

            <Divider horizontal>Or</Divider>
            <SocialLogin/>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  )
}
