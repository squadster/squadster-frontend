import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { setCurrentUser, setUserSquad } from '../../actions';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_SQUAD } from '../../requests';
import Spinner from '../Spinner'

function userFromParams() {
  const params = queryString.parse(window.location.search);
  if (params.user) {
    localStorage.setItem('currentUser', params.user)
    const user = JSON.parse(params.user)
    localStorage.setItem('authToken', user.auth_token)

    return user
  }
}

export default function AuthCallback() {
  const dispatch = useDispatch();
  const user = userFromParams();
  const { loading, data } = useQuery(GET_USER_SQUAD, { skip: !user, variables: { id: user.id } } )

  useEffect(() => {
    if (user) {
      dispatch(setCurrentUser(user))
      if (data && data.user.squadMember)
        dispatch(setUserSquad(data.user.squadMember))
    }
  }, [data, user])

  
  if (loading)
    return <Spinner/>
  else {
    if (user)
      if (user.squad)
        return <Redirect to='/squad'/>
      else
        return <Redirect to='/squads'/>
    else
      return <Redirect to='/' />
  }
}
