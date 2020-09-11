import React from 'react'
import { Calendar } from 'react-calendar'
import { Menu, Header } from 'semantic-ui-react'

export default function EventFilters({ loading, predicate, setPredicate }) {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Events'
          disabled={loading}
          active={predicate.get('filter') === 'all'}
          onClick={() => setPredicate('filter', 'all')}
        />

        <Menu.Item
          content="I'm going"
          disabled={loading}
          active={predicate.get('filter') === 'isGoing'}
          onClick={() => setPredicate('filter', 'isGoing')}
        />

        <Menu.Item
          content="I'm hosting"
          disabled={loading}
          active={predicate.get('filter') === 'isHost'}
          onClick={() => setPredicate('filter', 'isHost')}
        />
      </Menu>
      <Header icon='calendar' attached color='teal' content='Select date' />
      <Calendar
        tileDisabled={() => loading}
        value={predicate.get('startDate') || new Date()}
        onChange={data => setPredicate('startDate', data)}
      />
    </>
  )
}
