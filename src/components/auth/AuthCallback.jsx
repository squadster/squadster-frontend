import React from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { signIn, setCurrentUser } from '../../actions';
import { useDispatch } from 'react-redux';

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
  if (user) {
    dispatch(signIn())
    dispatch(setCurrentUser(user))

    return(
      <Redirect to='/squads' />
    );
  } else {
    return(
      // TODO: add flush error message
      <Redirect to='/' />
    );
  }
}
