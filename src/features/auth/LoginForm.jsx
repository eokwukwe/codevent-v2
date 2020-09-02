import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Label } from 'semantic-ui-react'

import TextInput from 'app/common/form/TextInput'
import ModalWrapper from 'app/common/modals/ModalWrapper'
import { closeModal } from 'app/common/modals/modalReducer'
import { signInWithEmail } from 'app/firestore/firebaseService'

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
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values)
            setSubmitting(false)
            dispatch(closeModal())
          } catch (error) {
            setErrors({ auth: 'Invalid credentials' })
            setSubmitting(false)
          }
        }}
      >
        {({ dirty, isValid, isSubmitting, errors }) => (
          <Form className='ui form'>
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
