import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  CLEAR_COMMENTS,
  LISTEN_TO_EVENT_CHAT
} from './eventConstants'

const initialState = {
  events: [],
  comments: []
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
    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload
      }
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      }
    default:
      return state
  }
}
