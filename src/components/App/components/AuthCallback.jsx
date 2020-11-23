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

function buildWarningMessage(warning) {
  switch (warning) {
    case "Invalid hash_id":
      return "Невалидная ссылка для входа или командир отряда отключил доступ по ссылке"
    case "User already has a squad_member":
      return  "Вы уже вступили в отряд, покиньте его чтобы войти в новый"
    default:
      return warning
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
      user.showInfo = params.show_info === "true"

      if (user)
        dispatch(setCurrentUser(user))
    }
  }, [data, dispatch, params.show_info])

  useEffect(() => {
    if (warnings.length)
      showAlert({message: buildWarningMessage(warnings[0]), variant: 'warning'})
  }, [warnings, showAlert])

  if (currentUser)
    return currentUser.squad ? <Redirect to='/my-squad'/> : <Redirect to='/squads'/>

  if (!token || warnings.length) {
    logout(dispatch)
    return <Redirect to='/' />
  }

  return <Spinner/>
}
