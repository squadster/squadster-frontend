import React, { useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { setCurrentUser } from 'actions/current_user_actions';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from 'requests';
import Spinner from './shared/Spinner'
import { setAxiosInterceptors, logout } from 'helpers'
import { AlertContext } from 'contexts'

function authToken(params) {
  if (params.user) {
    const token = JSON.parse(params.user).auth_token

    if (token) {
      localStorage.setItem('authToken', token)
      setAxiosInterceptors()  
    }
    
    return token 
  }
}

export default function AuthCallback() {
  const dispatch = useDispatch()
  const params = queryString.parse(window.location.search)
  const showAlert = useContext(AlertContext)

  const warnings = JSON.parse(params.warnings)
  const token = authToken(params)
  const { data } = useQuery(GET_CURRENT_USER, { skip: !token || warnings.length } )
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    if (data) {
      const user = data.currentUser
      if (user)
        dispatch(setCurrentUser(user))
    }
  }, [data, dispatch])

  useEffect(() => {
    if (warnings.length)
      showAlert({message: warnings[0], variant: 'warning'})
  }, [warnings, showAlert])

  if (currentUser)
    return currentUser.squad ? <Redirect to='/my-squad'/> : <Redirect to='/squads'/>

  if (!token || warnings.length) {
    logout(dispatch)
    return <Redirect to='/' />
  }

  return <Spinner/>
}
