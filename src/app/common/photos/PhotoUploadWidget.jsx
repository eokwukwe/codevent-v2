import React, { useState } from 'react'

import cuid from 'cuid'
import { toast } from 'react-toastify'
import PhotoWidgetCropper from './PhotoWidgetCropper'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'
import { Grid, Header, Button } from 'semantic-ui-react'

import { getFileExtension } from '../utils/util'
import { uploadToFirebaseStorage } from 'app/firestore/firebaseService'
import { updateUserProfilePhoto } from 'app/firestore/firestoreService'

export default function PhotoUploadWidget({ breakPoint, setEditMode }) {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleUploadImage() {
    setLoading(true)
    
    const filename = `${cuid()}.${getFileExtension(files[0].name)}`
    const uploadTask = uploadToFirebaseStorage(image, filename)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        console.log(`Upload is ${progress}% done`)
      },
      error => {
        toast.error(error.message)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false)
              handleCancelCrop()
              setEditMode(false)
            })
            .catch(error => {
              setLoading(false)
              toast.error(error.message)
            })
        })
      }
    )
  }

  function handleCancelCrop() {
    setFiles([])
    setImage(null)
  }

  return (
    <Grid stackable={breakPoint < 420} textAlign='center' verticalAlign='top'>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>

      {breakPoint > 1280 && <Grid.Column width={1} />}

      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 2 - Resize' />
        {files.length > 0 && (
          <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />
        )}
      </Grid.Column>

      {breakPoint > 1280 && <Grid.Column width={1} />}

      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 2 - Preview & Upload' />
        {files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                loading={loading}
                onClick={handleUploadImage}
                style={{ width: 100 }}
                positive
                icon='check'
              />
              <Button
                disabled={loading}
                onClick={handleCancelCrop}
                style={{ width: 100 }}
                icon='close'
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  )
}
