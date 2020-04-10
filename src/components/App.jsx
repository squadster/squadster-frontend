import React from "react"
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Navbar from './Navbar'
import Squad from './squad_page/Squad'
import PrivateRoute from './PrivateRoute'
import AuthCallback from "./auth/AuthCallback.jsx"
import Squads from "./squads_page/Squads.jsx"
import About from "./About.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { GET_USER_SQUAD } from '../requests'
import { useQuery } from '@apollo/react-hooks'
import Spinner from './Spinner'
import { setUserSquad } from '../actions'

function setAxiosInterceptors() {
  axios.interceptors.request.use(function (config) {
    const token = localStorage.authToken;
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  });
}

export default function App() {
  setAxiosInterceptors();
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const { loading, data } = useQuery(GET_USER_SQUAD, { skip: !user, variables: { id: user && user.id } } )

  if (loading) {
    return <Spinner/>
  }

  if (user && !user.squad && data.user.squadMember)
    dispatch(setUserSquad(data.user.squadMember))
  
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
