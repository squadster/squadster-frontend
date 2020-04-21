import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { setCurrentUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../../requests';
import Spinner from '../Spinner'
import { setAxiosInterceptors } from '../../helpers'

function authToken() {
  const params = queryString.parse(window.location.search);
  if (params.user) {
    const token = JSON.parse(params.user).auth_token

    localStorage.setItem('authToken', token)
    setAxiosInterceptors()

    return token
  }
}

export default function AuthCallback() {
  const dispatch = useDispatch()
  const token = authToken()
  const { data } = useQuery(GET_CURRENT_USER, { skip: !token } )
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    if (data) {
      const user = data.currentUser
      if (user)
        dispatch(setCurrentUser(user))
    }
  })

  if (currentUser)
    if (currentUser.squad)
      return <Redirect to='/squad'/>
    else
      return <Redirect to='/squads'/>

  if (!token)
    return <Redirect to='/' />

  return <Spinner/>
}
