import React from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Image, Dropdown } from 'semantic-ui-react'

import { signOutFirebase } from 'app/firestore/firebaseService'

export default function SignedInMenu() {
  const history = useHistory()

  const { currentUserProfile } = useSelector(state => state.profile)

  async function handleSignOut() {
    try {
      history.push('/')
      await signOutFirebase()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Menu.Item position='right'>
      <Image avatar spaced='right' src={currentUserProfile.photoURL || '/assets/user.png'} />
      <Dropdown
        pointing='top right'
        text={currentUserProfile.displayName.split(' ')[0]}
        // text={displayName !== 'undefined' ? displayName : 'Loading...'}
      >
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
          <Dropdown.Item as={Link} to='/account' text='My Account' icon='settings' />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile.id}`}
            text='My Profile'
            icon='user'
          />
          <Dropdown.Item onClick={handleSignOut} text='Sign Out' icon='power' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
