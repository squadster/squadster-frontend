import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Squad from './components/Squad/Squad'
import PrivateRoute from './components/PrivateRoute'
import AuthCallback from "./components/AuthCallback.jsx"
import Squads from "./components/Squads/Squads.jsx"
import About from "./components/About.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { GET_CURRENT_USER } from 'requests'
import { useQuery } from '@apollo/react-hooks'
import Spinner from './components/shared/Spinner'
import { setCurrentUser } from 'actions/current_user_actions'
import { setAxiosInterceptors, logout } from 'helpers'
import NewSquad from "./components/NewSquad/NewSquad"
import Landing from './components/Landing'

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
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/squads" component={Squads} />
          <PrivateRoute exact path="/my_squad" component={Squad} />
          <PrivateRoute exact path="/new_squad" component={NewSquad} />
          <Route path="/auth_callback" component={AuthCallback} />
          <Route path="/" component={user ? () => <Redirect to='/my_squad' /> : Landing} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}
