import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import Spinner from 'app/layout/Spinner'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import useFirestoreDoc from 'app/hooks/useFirestoreDoc'
import { listenToSelectedUserProfile } from '../profileActions'
import { getUserProfile } from 'app/firestore/firestoreService'

export default function ProfilePage({ match }) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.auth)
  const { selectedUserProfile } = useSelector(state => state.profile)
  const { loading, error } = useSelector(state => state.async)

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: profile => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id]
  })

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <Spinner content='Loading profile...' />

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
        <ProfileContent
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
      </Grid.Column>
    </Grid>
  )
}
