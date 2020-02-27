import loggedReducer from "./isLogged"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  isLoggedIn: loggedReducer
})

export default rootReducer;
