import currentUserReducer from  "./current_user_reducer"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  currentUser: currentUserReducer
})

export default rootReducer;
