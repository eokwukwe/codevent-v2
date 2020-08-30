import { combineReducers } from 'redux'

import authReducer from 'features/auth/authReducer'
import eventReducer from 'features/events/eventReducer'
import modalReducer from 'app/common/modals/modalReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  modals: modalReducer,
  events: eventReducer,
})

export default rootReducer
