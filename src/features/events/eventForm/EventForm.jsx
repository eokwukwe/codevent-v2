import React from 'react'
import { Segment, Header, Form, Button } from 'semantic-ui-react'

export default function EventForm() {
  return (
    <Segment clearing>
      <Header content="Create Event" />

      <Form>
        <Form.Field>
          <input type="text" name="" placeholder="Title" />
        </Form.Field>

        <Form.Field>
          <input type="text" name="" placeholder="Category" />
        </Form.Field>

        <Form.Field>
          <input type="text" name="" placeholder="Description" />
        </Form.Field>

        <Form.Field>
          <input type="text" name="" placeholder="City" />
        </Form.Field>

        <Form.Field>
          <input type="text" name="" placeholder="Venue" />
        </Form.Field>

        <Form.Field>
          <input type="date" name="" placeholder="Date" />
        </Form.Field>

        <Button size="mini" type="submit" floated="right" positive content="Submit" />
        <Button size="mini" floated="right" content="Cancel" />
      </Form>
    </Segment>
  )
}
