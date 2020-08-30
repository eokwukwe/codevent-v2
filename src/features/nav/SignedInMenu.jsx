import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Image, Dropdown } from 'semantic-ui-react'

import { signOutUser } from 'features/auth/authActions'

export default function SignedInMenu() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.auth)

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
          <Dropdown.Item
            onClick={() => {
              dispatch(signOutUser())
              history.push('/')
            }}
            text='Sign Out'
            icon='power'
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
