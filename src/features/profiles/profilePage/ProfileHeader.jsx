import React from 'react'
import { Segment, Grid, Item, Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react'

export default function ProfileHeader({ profile, isCurrentUser }) {
  const breakpoint = window.innerWidth

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              {breakpoint < 768 ? (
                <Item.Image avatar size='mini' src={profile.photoURL || '/assets/user.png'} />
              ) : (
                <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'} />
              )}
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>

        <Grid.Column width={4}>
          <Statistic.Group size='mini'>
            <Statistic label='Followers' value={5} />
            <Statistic label='Following' value={10} />
          </Statistic.Group>

          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button fluid size='small' color='teal' content='Follow' />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button
                    // onClick={followingUser ? () => handleUnfollowUser() : () => handleFollowUser()}
                    // loading={loading}
                    basic
                    fluid
                    size='small'
                    // color={followingUser ? 'red' : 'green'}
                    // content={followingUser ? 'Unfollow' : 'Follow'}
                    color='red'
                    content='Unfollow'
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
