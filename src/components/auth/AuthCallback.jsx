import React from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { signIn, setCurrentUser, setUserSquad } from '../../actions';
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

export default function AuthCallback(props) {
  const dispatch = useDispatch();
  const user = userFromParams();
  const { loading, data } = useQuery(GET_USER_SQUAD, { variables: { id: user.id } } )

  if (loading) {
    return <Spinner/>
  } else { 
    if (user) {
      dispatch(signIn())
      dispatch(setCurrentUser(user))

      if (data.user.squadMember) {
        dispatch(setUserSquad(data.user.squadMember))
        return <Redirect to='/squad'/>
      } else {
        return <Redirect to='/squads'/>
      }
    } else {
      return(
        // TODO: add flush error message
        <Redirect to='/' />
      );
    }
  }
}
