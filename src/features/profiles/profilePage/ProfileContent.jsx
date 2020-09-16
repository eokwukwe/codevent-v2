import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'

import AboutTab from './AboutTab'
import PhotoTab from './PhotoTab'
import EventsTab from './EventsTab'
import FollowingTab from './FollowingTab'

export default function ProfileContent({ profile, isCurrentUser }) {
  const breakPoint = window.innerWidth

  const [activeTab, setActiveTab] = useState(0)

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
      render: () => <EventsTab profile={profile} breakPoint={breakPoint} />
    },
    {
      menuItem: 'Followers',
      render: () => (
        <FollowingTab
          key={profile.id}
          profile={profile}
          activeTab={activeTab}
          breakPoint={breakPoint}
        />
      )
    },
    {
      menuItem: 'Following',
      render: () => (
        <FollowingTab
          key={profile.id}
          profile={profile}
          activeTab={activeTab}
          breakPoint={breakPoint}
        />
      )
    }
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
          onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
      )}
    </div>
  )
}
