import loggedReducer from "./is_logged"
import currentUserReducer from  "./current_user"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  isLoggedIn: loggedReducer,
  currentUser: currentUserReducer
})

export default rootReducer;
