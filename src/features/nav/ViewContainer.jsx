import React, { useState } from 'react'
import { Responsive } from 'semantic-ui-react'
import {withRouter, useHistory} from 'react-router-dom'

import MobileView from './MobileView'
import DesktopView from './DesktopView'

function ViewContainer({ children }) {
  const history = useHistory()
  const [authenticated, setAuthenticated] = useState(false)

  function handleSignOut() {
    setAuthenticated(false)
    history.push('/')
  }

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
        signOut={handleSignOut}
        setAuthenticated={setAuthenticated}
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
        signOut={handleSignOut}
        setAuthenticated={setAuthenticated}
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
