import React from 'react'
import { Tab } from 'semantic-ui-react'
import AboutTab from './AboutTab'

export default function ProfileContent({profile, isCurrentUser}) {
  const breakpoint = window.innerWidth

  const panes = [
    {
      menuItem: 'About',
      render: () => <AboutTab isCurrentUser={isCurrentUser} profile={profile} />
    },
    { menuItem: 'Photos', render: () => <Tab.Pane>User Photos</Tab.Pane> },
    { menuItem: 'Events', render: () => <Tab.Pane>User Events</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane>User Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Foolowing User</Tab.Pane> }
  ]
  return (
    <div>
      {breakpoint < 768 ? (
        <Tab menu={{ fluid: true, attached: 'top' }} panes={panes} />
      ) : (
        <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} />
      )}
    </div>
  )
}
