import React, { useState } from 'react'

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react'

import { listenToUserPhotos } from '../profileActions'
import PhotoUploadWidget from 'app/common/photos/PhotoUploadWidget'
import useFirestoreCollection from 'app/hooks/useFirestoreCollection'
import { deleteFromFirebaseStorage } from 'app/firestore/firebaseService'
import {
  getUserPhotos,
  setMainPhoto,
  deletePhotoFromCollection
} from 'app/firestore/firestoreService'

export default function PhotoTab({ profile, isCurrentUser, breakPoint }) {
  const xtraSmall = breakPoint <= 520
  const small = breakPoint > 520 && breakPoint <= 991

  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [updating, setUpdating] = useState({ isUpdating: false, target: null })
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null })

  const { loading } = useSelector(state => state.async)
  const { photos } = useSelector(state => state.profile)

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: photos => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch]
  })

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target })
    try {
      await setMainPhoto(photo)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUpdating({ isUpdating: false, target: null })
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target })
    try {
      await deleteFromFirebaseStorage(photo.name)
      await deletePhotoFromCollection(photo.id)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDeleting({ isDeleting: false, target: null })
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`Photos ${profile.displayName}`}
          />

          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              color={editMode ? 'grey' : 'green'}
              size='small'
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget
              setEditMode={setEditMode}
              breakPoint={breakPoint}
            />
          ) : (
            <Card.Group itemsPerRow={xtraSmall ? 3 : small ? 4 : 6}>
              {photos &&
                photos.map(photo => (
                  <Card key={photo.id}>
                    <Image circular src={photo.url} />
                    <Button
                      size='tiny'
                      basic
                      color='green'
                      content='main'
                      name={photo.id}
                      disabled={photo.url === profile.photoURL}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      onClick={e => handleSetMainPhoto(photo, e.target.name)}
                    />
                    <Button
                      size='tiny'
                      basic
                      color='red'
                      icon='trash'
                      name={photo.id}
                      disabled={photo.url === profile.photoURL}
                      loading={
                        deleting.isDeleting && deleting.target === photo.id
                      }
                      onClick={e => handleDeletePhoto(photo, e.target.name)}
                    />
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
