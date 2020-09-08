import React from 'react'
import { Tab } from 'semantic-ui-react'
import AboutTab from './AboutTab'
import PhotoTab from './PhotoTab'

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
    { menuItem: 'Events', render: () => <Tab.Pane>User Events</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane>User Followers</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Foolowing User</Tab.Pane> }
  ]
  return (
    <div>
      {breakPoint < 768 ? (
        <Tab activeIndex={1} menu={{ fluid: true, attached: 'top' }} panes={panes} />
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
