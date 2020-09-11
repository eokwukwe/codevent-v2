import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Button, Container, Menu, Responsive } from 'semantic-ui-react'

import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

function DesktopView({ children, getWidth, authenticated }) {
  // const authenticated = auth.isLoaded && !auth.isEmpty

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Menu inverted secondary fixed='top' size='small'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <img src='/assets/logo128.png' alt='logo' />{' '}
            <span style={{ fontSize: '1.5rem', color: 'white' }}>CodEvents</span>
          </Menu.Item>
          <Menu.Item as={NavLink} exact to='/events' name='Events' />

          {authenticated && (
            <>
              <Menu.Item as={NavLink} exact to='/people' name='People' />
              <Menu.Item>
                <Button
                  as={Link}
                  to='/createEvent'
                  floated='right'
                  inverted
                  compact
                  positive
                  content='Create'
                />
              </Menu.Item>
            </>
          )}

          {authenticated ? (
            <SignedInMenu />
          ) : (
            <SignedOutMenu />
          )}
        </Container>
      </Menu>
      {children}
    </Responsive>
  )
}

export default withRouter(DesktopView)
