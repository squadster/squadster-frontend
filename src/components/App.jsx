import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './Navbar'
import Squad from './squad_page/Squad'
import PrivateRoute from './PrivateRoute'
import AuthCallback from "./auth/AuthCallback.jsx"
import Squads from "./squads_page/Squads.jsx"
import About from "./About.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { GET_CURRENT_USER } from '../requests'
import { useQuery } from '@apollo/react-hooks'
import Spinner from './Spinner'
import { setCurrentUser } from '../actions'
import { setAxiosInterceptors, logout } from '../helpers'

export default function App() {
  setAxiosInterceptors();
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const { loading, data } = useQuery(GET_CURRENT_USER, { skip: !localStorage.authToken, onError: () => logout(dispatch) } )

  if (loading) {
    return <Spinner/>
  }

  if (!user && data && data.currentUser) {
    dispatch(setCurrentUser(data.currentUser))
  }


  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route path="/about" component={About} />
          <PrivateRoute path="/squads" component={Squads} />
          <PrivateRoute path="/my-squad" component={Squad} />
          <Route path="/auth_callback" component={AuthCallback} />
          <Route path='*' exact={true} component={() => <Redirect to='/' />} />
        </Switch>
      </div>
    </Router>
  );
}
