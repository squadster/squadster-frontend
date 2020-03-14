import loggedReducer from "./logged_reducer"
import currentUserReducer from  "./current_user_reducer"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  isLoggedIn: loggedReducer,
  currentUser: currentUserReducer
})

export default rootReducer;
