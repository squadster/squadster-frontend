import React from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

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
  if (isTokenPresent()) {
    setToken();
    return(
      <Redirect to='/squads' />
    );
  } else {
    return(
      // TODO: add flush error message
      <Redirect to='/login' />
    );
  }
}
