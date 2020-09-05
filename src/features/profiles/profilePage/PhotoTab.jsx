import React, { useState } from 'react'
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react'
import PhotoUploadWidget from 'app/common/photos/PhotoUploadWidget'

export default function PhotoTab({ profile, isCurrentUser, breakPoint }) {
  const xtraSmall = breakPoint <= 520
  const small = breakPoint > 520 && breakPoint <= 991

  const [editMode, setEditMode] = useState(true)

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`Photos ${profile.displayName}`} />

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
            <PhotoUploadWidget breakPoint={breakPoint} />
          ) : (
            <Card.Group itemsPerRow={xtraSmall ? 3 : small ? 4 : 6}>
              <Card>
                <Image circular src='/assets/user.png' />
                <Button size='tiny' basic color='green' content='main' />
                <Button size='tiny' basic color='red' icon='trash' />
              </Card>
              <Card>
                <Image circular src='/assets/user.png' />
                <Button size='tiny' basic color='green' content='main' />
                <Button size='tiny' basic color='red' icon='trash' />
              </Card>
              <Card>
                <Image circular src='/assets/user.png' />
                <Button size='tiny' basic color='green' content='main' />
                <Button size='tiny' basic color='red' icon='trash' />
              </Card>
              <Card>
                <Image circular src='/assets/user.png' />
                <Button size='tiny' basic color='green' content='main' />
                <Button size='tiny' basic color='red' icon='trash' />
              </Card>
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}
