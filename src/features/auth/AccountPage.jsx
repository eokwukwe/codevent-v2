import React from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Segment, Header, Button, Label, Grid } from 'semantic-ui-react'

import TextInput from 'app/common/form/TextInput'
import { updateUserPassword } from 'app/firestore/firebaseService'

export default function AccountPage() {
  const { currentUser } = useSelector(state => state.auth)

  return (
    <Grid centered>
      <Grid.Column mobile={15} tablet={10} computer={7}>
        <Segment>
          <Header textAlign='center' dividing size='large' content='Account' />

          {currentUser.providerId === 'password' && (
            <>
              <Header
                color='teal'
                sub
                content='Change Password'
                style={{marginBottom: '1rem'}}
              />

              <Formik
                initialValues={{ newPassword1: '', newPassword2: '' }}
                validationSchema={Yup.object({
                  newPassword1: Yup.string().required('Password is required'),
                  newPassword2: Yup.string().oneOf(
                    [Yup.ref('newPassword1'), null],
                    'Passwords do not match'
                  )
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  try {
                    await updateUserPassword(values)
                  } catch (error) {
                    setErrors({ auth: error.message })
                  } finally {
                    setSubmitting(false)
                  }
                }}
              >
                {({ errors, isSubmitting, isValid, dirty }) => (
                  <Form className='ui form'>
                    <TextInput
                      name='newPassword1'
                      type='password'
                      placeholder='New Password'
                    />

                    <TextInput
                      name='newPassword2'
                      type='password'
                      placeholder='Confirm Password'
                    />

                    {errors.auth && (
                      <Label
                        basic c
                        olor='red'
                        style={{marginBottom: 10}}
                        content={errors.auth}
                      />
                    )}

                    <Button
                      style={{ display: 'block', margin: '0 auto' }}
                      type='submit'
                      disabled={!isValid || isSubmitting || !dirty}
                      loading={isSubmitting}
                      size='small'
                      positive
                      content='Update password'
                    />
                  </Form>
                )}
              </Formik>
            </>
          )}

          {currentUser.providerId === 'facebook.com' && (
            <>
              <Header color='teal' sub content='Facebook account' />
              <p>Please visit Facebook to update your account</p>
              <Button
                icon='facebook'
                color='facebook'
                as={Link}
                to='https://facebook.com'
                content='Go to Facebook'
              />
            </>
          )}
          {currentUser.providerId === 'google.com' && (
            <>
              <Header color='teal' sub content='Google account' />
              <p>Please visit Google to update your account</p>
              <Button
                icon='google'
                color='google plus'
                as={Link}
                to='https://google.com'
                content='Go to Google'
              />
            </>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
