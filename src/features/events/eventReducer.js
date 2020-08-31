import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants'

const initialState = {
  events: []
}

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: payload
      }
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload]
      }
    case UPDATE_EVENT:
      return {
        ...state,
        events: [...state.events.filter(event => event.id !== payload.id), payload]
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter(event => event.id !== payload)]
      }
    default:
      return state
  }
}
