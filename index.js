import ApolloClient from 'apollo-boost'
import { API_URL } from './src/constants'

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

function isLoggedIn() {
  return !!window.localStorage.getItem('authToken');
}

function getCurrentUser() {
  if (localStorage.currentUser)
    return JSON.parse(localStorage.currentUser)
}

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
  }
}

export {apolloClient, getWeekDay, isLoggedIn, getCurrentUser };
