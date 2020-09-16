import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header, Tab, Card } from 'semantic-ui-react'

import ProfileCard from './ProfileCard'
import { listenToFollowers, listenToFollowings } from '../profileActions'
import useFirestoreCollection from 'app/hooks/useFirestoreCollection'
import {
  getFollowersCollection,
  getFollowingCollection
} from 'app/firestore/firestoreService'

export default function FollowingTab({ profile, activeTab, breakPoint }) {
  const xtraSmall = breakPoint <= 520
  const small = breakPoint > 520 && breakPoint <= 991

  const dispatch = useDispatch()

  const { loading } = useSelector(state => state.async)
  const { followings, followers } = useSelector(state => state.profile)

  useFirestoreCollection({
    query:
      activeTab === 3
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: data =>
      activeTab === 3
        ? dispatch(listenToFollowers(data))
        : dispatch(listenToFollowings(data)),
    deps: [activeTab, dispatch]
  })

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={activeTab === 3 ? 'Followers' : 'Following'}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={xtraSmall ? 2 : small ? 3 : 4}>
            {activeTab === 3 &&
              followers.map(profile => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
            {activeTab === 4 &&
              followings.map(profile => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
