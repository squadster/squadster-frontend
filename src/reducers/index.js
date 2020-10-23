import currentUserReducer from  "./current_user_reducer"
import squadsReducer from './squads_reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  squads: squadsReducer
})

export default rootReducer;
