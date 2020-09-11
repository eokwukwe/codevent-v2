import React, { useState } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Icon, Menu, Sidebar, Responsive, Container } from 'semantic-ui-react'

import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

function MobileView({ children, getWidth, authenticated }) {
  const [sidebarOpened, setSidebarOpen] = useState(false)
  const handleSidebarHide = () => setSidebarOpen(false)
  const handleToggle = () => setSidebarOpen(true)

  return (
    <Responsive as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar
        width='thin'
        as={Menu}
        animation='overlay'
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item
          style={{
            borderBottom: '1px solid green'
          }}
          as={NavLink}
          exact
          to='/'
          header
        >
          <img style={{ verticalAlign: 'bottom' }} src='/assets/logo128.png' alt='logo' />{' '}
          <span style={{ fontSize: '1.5rem' }}>CodEvents</span>
        </Menu.Item>

        <Menu.Item onClick={handleSidebarHide} as={NavLink} exact to='/events' name='Events' />

        <>
          <Menu.Item onClick={handleSidebarHide} as={NavLink} exact to='/people' name='People' />
          <Menu.Item onClick={handleSidebarHide} as={Link} to='/createEvent' name='Create' />
        </>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Menu inverted secondary fixed='top' size='small'>
          <Container>
            <Menu.Item onClick={handleToggle}>
              <Icon name='sidebar' />
            </Menu.Item>
            <Menu.Item as={NavLink} exact to='/' header>
              <img src='/assets/logo128.png' alt='logo' />
              <span style={{ fontSize: '1.5rem', color: 'white' }}>CodEvents</span>
            </Menu.Item>

            {authenticated ? (
              <SignedInMenu />
            ) : (
              <SignedOutMenu />
            )}
          </Container>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Responsive>
  )
}
export default withRouter(MobileView)
