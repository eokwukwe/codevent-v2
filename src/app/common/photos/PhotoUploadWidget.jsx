import React, { useState } from 'react'
import { Grid, Header, Button } from 'semantic-ui-react'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'
import PhotoWidgetCropper from './PhotoWidgetCropper'

export default function PhotoUploadWidget({ breakPoint }) {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)

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
                // loading={loading}
                // onClick={handleUploadImage}
                style={{ width: 100 }}
                positive
                icon='check'
              />
              <Button
                // disabled={loading}
                // onClick={handleCancelCrop}
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