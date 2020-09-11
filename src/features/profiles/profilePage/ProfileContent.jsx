import React from 'react'
import { Tab } from 'semantic-ui-react'

import AboutTab from './AboutTab'
import PhotoTab from './PhotoTab'
import EventsTab from './EventsTab'

export default function ProfileContent({ profile, isCurrentUser }) {
  const breakPoint = window.innerWidth

  const panes = [
    {
      menuItem: 'About',
      render: () => <AboutTab isCurrentUser={isCurrentUser} profile={profile} />
    },
    {
      menuItem: 'Photos',
      render: () => (
        <PhotoTab
          breakPoint={breakPoint}
          isCurrentUser={isCurrentUser}
          profile={profile}
        />
      )
    },
    {
      menuItem: 'Events',
      render: () => (
        <EventsTab
          profile={profile}
          breakPoint={breakPoint}
        />
      )
    },
    { menuItem: 'Followers', render: () => <Tab.Pane>User Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Foolowing User</Tab.Pane> }
  ]
  return (
    <div>
      {breakPoint < 768 ? (
        <Tab menu={{ fluid: true, attached: 'top' }} panes={panes} />
      ) : (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition='right'
          panes={panes}
        />
      )}
    </div>
  )
}
