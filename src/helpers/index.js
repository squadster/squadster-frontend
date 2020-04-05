import React from 'react'
import ApolloClient from 'apollo-boost'
import { API_URL } from '../constants'
import { setCurrentUser } from '../actions';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

const apolloClient = new ApolloClient({
  uri: API_URL + '/api/query',
  request: (operation) => {
    const token = localStorage.authToken
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

function logout(reducer) {
  axios({ method: 'DELETE', url: `${API_URL}/api/auth`})
       .finally(() => {
        localStorage.removeItem('authToken')
        reducer(setCurrentUser(null))
        return <Redirect to='/'/>
       })
}

function setAxiosInterceptors() {
  axios.interceptors.request.use(function (config) {
    const token = localStorage.authToken;
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  });
}


const isMobile = window.screen.width < 992

function getWeekDay(day) {
  switch (day) {
    case 'monday':
      return 'Понедельник'
    case 'tuesday':
      return 'Вторник'
    case 'wednesday':
      return 'Среда'
    case 'thursday':
      return 'Четверг'
    case 'friday':
      return 'Пятница'
    case 'saturday':
      return 'Суббота'
    default:
      break;
  }
}

function getMemberRole(role) {
  switch (role) {
    case 'commander':
      return 'Командир взвода'
    case 'deputy_commander':
      return 'Зам. Командира взвода'
    case 'student':
      return 'Студент'
    case 'journalist':
      return 'Журналист'
    default: break
  }
}

function isCommander(user) {
  return user.role === 'commander'
}

export { apolloClient, setAxiosInterceptors, logout, getWeekDay, getMemberRole, isMobile, isCommander };
