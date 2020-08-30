import React from 'react'
import { useSelector } from 'react-redux'
import { Responsive } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import MobileView from './MobileView'
import DesktopView from './DesktopView'

function ViewContainer({ children }) {
  const { authenticated } = useSelector(state => state.auth)

  const getWidth = () => {
    const isSSR = typeof window === 'undefined'
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }

  return (
    <div>
      <DesktopView
        // login={handleLogin}
        // register={handleRegister}
        getWidth={getWidth}
        authenticated={authenticated}
        // auth={auth}
        // logout={handleSignedOut}
        // profile={profile}
      >
        {children}
      </DesktopView>

      <MobileView
        // login={handleLogin}
        // register={handleRegister}
        getWidth={getWidth}
        authenticated={authenticated}
        // auth={auth}
        // logout={handleSignedOut}
        // profile={profile}
      >
        {children}
      </MobileView>
    </div>
  )
}

export default withRouter(ViewContainer)
