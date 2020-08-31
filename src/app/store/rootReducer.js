import { combineReducers } from 'redux'

import asyncReducer from 'app/async/asyncReducer'
import authReducer from 'features/auth/authReducer'
import eventReducer from 'features/events/eventReducer'
import modalReducer from 'app/common/modals/modalReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  modals: modalReducer,
  events: eventReducer,
})

export default rootReducer
