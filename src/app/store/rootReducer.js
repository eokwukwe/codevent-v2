import { combineReducers } from 'redux'

import asyncReducer from 'app/async/asyncReducer'
import authReducer from 'features/auth/authReducer'
import eventReducer from 'features/events/eventReducer'
import modalReducer from 'app/common/modals/modalReducer'
import profileReducer from 'features/profiles/profileReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  modals: modalReducer,
  events: eventReducer,
  profile: profileReducer
})

export default rootReducer
