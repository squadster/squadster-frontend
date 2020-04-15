import ApolloClient from 'apollo-boost'
import { API_URL } from '../constants'

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

function getCurrentUser() {
  if (localStorage.currentUser)
    return JSON.parse(localStorage.currentUser)
}

function isCommander(user) {
  return user.role === 'commander'
}


export {apolloClient, getWeekDay, getMemberRole, getCurrentUser, isMobile, isCommander };
