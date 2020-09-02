import React from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Image, Dropdown } from 'semantic-ui-react'

import { signOutFirebase } from 'app/firestore/firebaseService'

export default function SignedInMenu() {
  const history = useHistory()

  const { currentUser } = useSelector(state => state.auth)

  async function handleSignOut() {
    try {
      await signOutFirebase()
      history.push('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={currentUser.photoURL || '/assets/user.png'} />
      <Dropdown
        pointing='top right'
        text={currentUser.email}
        // text={displayName !== 'undefined' ? displayName : 'Loading...'}
      >
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
          <Dropdown.Item text='My Events' icon='calendar' />
          <Dropdown.Item text='My Network' icon='users' />
          <Dropdown.Item as={Link} to='/profile' text='My Profile' icon='user' />
          <Dropdown.Item as={Link} to='/settings' text='Settings' icon='settings' />
          <Dropdown.Item onClick={handleSignOut} text='Sign Out' icon='power' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
