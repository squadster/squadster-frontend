import React from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { signIn } from '../../actions';
import { useDispatch } from 'react-redux';

function setToken() {
  window.localStorage.setItem('authToken', tokenFromParams());
}

function tokenFromParams() {
  let params = queryString.parse(window.location.search);
  return params.token;
}

function isTokenPresent() {
  return !!tokenFromParams();
}

export default function AuthCallback(props) {
  const dispatch = useDispatch();

  if (isTokenPresent()) {
    setToken();
    dispatch(signIn())
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
