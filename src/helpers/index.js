import React from 'react'
import ApolloClient from 'apollo-boost'
import { API_URL } from 'static'
import { setCurrentUser } from '../actions/current_user_actions';
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


const isMobile = window.innerWidth < 992

function getWeekDayByNumber(day) {
  switch (day) {
    case 1:
      return 'Понедельник'
    case 2:
      return 'Вторник'
    case 3:
      return 'Среда'
    case 4:
      return 'Четверг'
    case 5:
      return 'Пятница'
    case 6:
      return 'Суббота'
    default:
      break;
  }
}

function getWeekDayNumber(day) {
  switch (day) {
    case 'monday':
      return 1
    case 'tuesday':
      return 2
    case 'wednesday':
      return 3
    case 'thursday':
      return 4
    case 'friday':
      return 5
    case 'saturday':
      return 6
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

function canChangeClassDay(user) {
  switch (user.role) {
    case 'commander':
      return true
    case 'deputy_commander':
      return true
    case 'journalist':
      return true
    default: break
  }
}

export {
  apolloClient,
  setAxiosInterceptors,
  logout,
  canChangeClassDay,
  getMemberRole,
  isMobile,
  isCommander,
  getWeekDayNumber,
  getWeekDayByNumber,
};
